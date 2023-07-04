{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux;
    let

      npm2nix =
        (packageLockPath: reload:
          let
            packageLock = lib.trivial.pipe
              packageLockPath [
              builtins.readFile
              builtins.fromJSON
            ];

            tarballsFile = lib.trivial.pipe (packageLock.packages) [
              ((lib.trivial.flip removeAttrs) [ "" ])

              builtins.attrValues

              (map (p: fetchurl {
                url = p.resolved;
                hash = p.integrity;
              }))

              (builtins.concatStringsSep "\n")

              (tarballs: writeTextFile {
                text = tarballs + "\n";
                name = "${packageLock.name}-${packageLock.version}-tarballs";
              })
            ];

            nodeModules = stdenv.mkDerivation {
              pname = "${packageLock.name}-node-modules";
              version = packageLock.version;
              buildInputs = [ nodejs ];
              dontUnpack = true;
              buildPhase = ''
                export HOME="$TMP/.home"
                npm config set progress false

                while read package
                do npm cache add "$package"
                done < ${tarballsFile}

                mkdir "$out"
                cd "$out"
                cp ${packageLockPath} ./package-lock.json
                npm ci --ignore-scripts --offline
                rm package-lock.json
              '';
            };

          in
          {
            setupNodeModules = ''
              ln -sfn ${nodeModules}/node_modules ./node_modules
            '';

            npm = writeShellScriptBin "npm" ''
              array_includes() {
                  local word=$1
                  shift
                  for el in "$@"; do [[ "$el" == "$word" ]] && return 0; done
              }

              if ! array_includes install "$@" \
                 && ! array_includes uninstall "$@" \
                 && ! array_includes dedupe "$@" \
                 && ! array_includes ci "$@" \
              ; then
                ${nodejs}/bin/npm "$@" && exit 0
              fi
          
              unlink ./node_modules
              ${nodejs}/bin/npm "$@" --package-lock-only
              ${reload}
            '';
          }
        );

      npmPackages = npm2nix ./package-lock.json "direnv reload";
    in
    {

      devShell.x86_64-linux = mkShellNoCC {
        buildInputs = [ bun npmPackages.npm ];
        shellHook = npmPackages.setupNodeModules;
      };

      packages.x86_64-linux.default = stdenv.mkDerivation {
        name = "my-package";
        src = ./.;
        configurePhase = npmPackages.setupNodeModules;
        buildPhase = "${bun}/bin/bun build src/index.ts --outfile ./dist/index.js";
        installPhase = ''
          mkdir $out
          cp dist/index.js $out
        '';
      };

    };
}
