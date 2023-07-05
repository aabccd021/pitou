{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
    tree-sitter-javascript = { url = "github:tree-sitter/tree-sitter-javascript"; flake = false; };
    tree-sitter-nix = { url = "github:nix-community/tree-sitter-nix"; flake = false; };
  };

  outputs = inputs: with inputs.nixpkgs.legacyPackages.x86_64-linux;
    let
      pkgs = inputs.nixpkgs.legacyPackages.x86_64-linux;

      npm = import ./npm2nix.nix pkgs ./package-lock.json;

      treeSitterWasms = import ./tree-sitter-wasm.nix pkgs {
        javascript = inputs.tree-sitter-javascript;
        nix = inputs.tree-sitter-nix;
      };
    in
    {

      devShell.x86_64-linux = mkShellNoCC {
        buildInputs = [ bun npm.command ];
        shellHook = npm.setupNodeModules;
      };

      packages.x86_64-linux.default = stdenv.mkDerivation {
        name = "pitou";
        src = ./src;
        unpackPhase = ''
          cp -r "$src" ./src
        '';
        configurePhase = npm.setupNodeModules;
        buildPhase = ''
          ${bun}/bin/bun build ./src/index.ts --target bun --outfile ./dist/index.js
        '';
        installPhase = ''
          mkdir $out
          cp dist/index.js $out
          while read wasm 
          do cp -r "$wasm/." $out
          done < ${treeSitterWasms}
        '';
      };

      apps.x86_64-linux.default = {
        type = "app";
        program = toString (writeShellScript "aabccd" ''
          echo aabccd022
        '');
      };
    };
}
