{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux;
    let

      packageLock = lib.trivial.pipe ./package-lock.json [
        builtins.readFile
        builtins.fromJSON
      ];

      tarballsFile = lib.trivial.pipe (packageLock.packages) [
        ((lib.trivial.flip removeAttrs) [ "" ])

        builtins.attrValues

        (map (p: pkgs.fetchurl {
          url = p.resolved;
          hash = p.integrity;
        }))

        (builtins.concatStringsSep "\n")

        (tarballs: pkgs.writeTextFile {
          text = tarballs + "\n";
          name = "${packageLock.name}-${packageLock.version}-tarballs";
        })
      ];

      nodeModules = pkgs.stdenv.mkDerivation
        {
          pname = "${packageLock.name}-node-modules";
          version = packageLock.version;
          buildInputs = [ pkgs.nodejs ];
          dontUnpack = true;
          buildPhase = ''
            export HOME="$TMP/.home"
            npm config set cache "$TMP/.npm-cache"
            npm config set progress false

            while read package
            do npm cache add "$package"
            done < ${tarballsFile}

            mkdir "$out"
            cd "$out"
            cp ${./package-lock.json} ./package-lock.json
            npm ci --ignore-scripts --offline
            rm package-lock.json
          '';
        };

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
        direnv reload
      '';

    in
    {

      devShell.x86_64-linux = mkShellNoCC {
        buildInputs = [ bun npm ];
        shellHook = setupNodeModules;
      };

      packages.x86_64-linux.default = stdenv.mkDerivation {
        name = "my-package";
        src = ./.;
        configurePhase = setupNodeModules;
        buildPhase = "${bun}/bin/bun build src/index.ts --outfile ./dist/index.js";
        installPhase = ''
          mkdir $out
          cp dist/index.js $out
        '';
      };

    };
}
