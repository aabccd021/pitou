{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux;
    let


      packageLockSrc = builtins.path
        {
          filter = path: _: baseNameOf path == "package-lock.json";
          path = ./.;
          name = "src";
        };

      packageLock = builtins.fromJSON (builtins.readFile "${packageLockSrc}/package-lock.json");

      deps = builtins.attrValues (removeAttrs packageLock.packages [ "" ]);

      tarballs = map (p: pkgs.fetchurl { url = p.resolved; hash = p.integrity; }) deps;

      tarballsFile = pkgs.writeTextFile {
        name = "tarballs";
        text = builtins.concatStringsSep "\n" tarballs + "\n";
      };

      nodeModules = pkgs.stdenv.mkDerivation
        {
          inherit (packageLock) name version;
          buildInputs = [ pkgs.nodejs ];
          src = packageLockSrc;
          buildPhase = ''
            export HOME=$PWD/.home
            cachePath=$PWD/.npm

            npm config set cache "$cachePath"
            npm config set offline true
            npm config set progress false

            while read package
            do
              npm cache add "$package"
            done <${tarballsFile}

            mkdir $out
            cd $out
            cp $src/package-lock.json .
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
        oldPackageLockHash="$(sha512sum package-lock.json)"

        ${nodejs}/bin/npm "$@" --package-lock-only

        newPackageLockHash="$(sha512sum package-lock.json)"
        if [ "$oldPackageLockHash" != "$newPackageLockHash" ]; then
          ${prefetch-npm-deps}/bin/prefetch-npm-deps package-lock.json > ./npmDepsHash.txt
        fi

        ${setupNodeModules}
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
