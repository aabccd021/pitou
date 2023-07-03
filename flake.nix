{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux;
    let

      packageLock = builtins.path {
        filter = path: _: baseNameOf path == "package-lock.json";
        path = ./.;
        name = "src";
      };

      nodeModules = buildNpmPackage {
        name = "node_modules";
        src = packageLock;
        dontNpmBuild = true;
        npmDepsHash = builtins.readFile ./npmDepsHash.txt;
        installPhase = ''
          mkdir $out
          cp -r node_modules $out
        '';
      };

      setupNodeModules = ''
        ln -sfn ${nodeModules}/node_modules ./node_modules
      '';

      npm = writeShellScriptBin "npm" ''
        unlink ./node_modules

        oldPackageLockHash="$(sha512sum package-lock.json)"

        ${nodejs}/bin/npm "$@" --package-lock-only

        newPackageLockHash="$(sha512sum package-lock.json)"
        if [ "$oldPackageLockHash" != "$newPackageLockHash" ]; then
          ${prefetch-npm-deps}/bin/prefetch-npm-deps package-lock.json > ./npmDepsHash.txt
        fi

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
