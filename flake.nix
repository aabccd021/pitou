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
        npmDepsHash = "sha256-alSzA+1eBokELdgCiOmIxn8/ThDkePoWaGowyWt4zPM=";
        installPhase = ''
          mkdir $out
          cp -r node_modules $out
        '';
      };
    in
    {
      devShell.x86_64-linux = mkShellNoCC {
        buildInputs = [ bun ];
        shellHook = ''
          if [[ -e ./node_modules ]]; then
            unlink ./node_modules
          fi
          ln -s ${nodeModules}/node_modules ./node_modules
        '';
      };

      packages.x86_64-linux.default = stdenv.mkDerivation {
        name = "my-package";
        src = ./.;
        buildPhase = ''
          ln -s ${nodeModules}/node_modules ./node_modules
          ${bun}/bin/bun build src/index.ts --outfile ./dist/index.js
        '';
        installPhase = ''
          mkdir $out
          cp dist/index.js $out
        '';
      };
    };
}
