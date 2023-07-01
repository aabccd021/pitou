{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux;
    {
      devShell.x86_64-linux = mkShellNoCC {
        buildInputs = [ bun ];
      };

      packages.x86_64-linux.default = buildNpmPackage {
        name = "my-package";
        src = ./.;
        npmDepsHash = "sha256-Hzau5vU5q0+FlUhxp7nLKisgBTk3bMGZi0yAhFf9bIA=";
        buildPhase = ''
          ${bun}/bin/bun build src/index.ts --outfile ./dist/index.js
        '';
        installPhase = ''
          mkdir $out
          cp dist/index.js $out
        '';
      };
    };
}
