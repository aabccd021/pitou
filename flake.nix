{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux;
    let

      nodeModules = buildNpmPackage {
        name = "node_modules";
        src = ./.;
        dontNpmBuild = true;
        npmDepsHash = import ./npmDepsHash.nix;
        installPhase = ''
          mkdir $out
          cp -r node_modules $out
        '';
      };

      npmInstall = "ln -sfn ${nodeModules}/node_modules ./node_modules";

      updateNpmHash = writeShellScriptBin "updateNpmHash" ''
        npm install --package-lock-only
        hash=$(${prefetch-npm-deps}/bin/prefetch-npm-deps package-lock.json)
        echo "$hash"
        echo "\"$hash\"" > ./npmDepsHash.nix
        direnv reload
      '';

    in
    {

      devShell.x86_64-linux = mkShellNoCC {
        buildInputs = [ bun updateNpmHash ];
        shellHook = npmInstall;
      };

      packages.x86_64-linux.default = stdenv.mkDerivation {
        name = "my-package";
        src = ./.;
        configurePhase = npmInstall;
        buildPhase = "${bun}/bin/bun build src/index.ts --outfile ./dist/index.js";
        installPhase = ''
          mkdir $out
          cp dist/index.js $out
        '';
      };

    };
}
