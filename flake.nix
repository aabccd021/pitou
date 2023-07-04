{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux;
    let
      npm = import ./npm2nix.nix {
        pkgs = nixpkgs.legacyPackages.x86_64-linux;
        packageLockPath = ./package-lock.json;
        reload = "direnv reload";
      };
    in
    {

      devShell.x86_64-linux = mkShellNoCC {
        buildInputs = [ bun npm.command ];
        shellHook = npm.setupNodeModules;
      };

      packages.x86_64-linux.default = stdenv.mkDerivation {
        name = "my-package";
        src = ./.;
        configurePhase = npm.setupNodeModules;
        buildPhase = "${bun}/bin/bun build src/index.ts --outfile ./dist/index.js";
        installPhase = ''
          mkdir $out
          cp dist/index.js $out
        '';
      };

    };
}
