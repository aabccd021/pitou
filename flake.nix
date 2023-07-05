{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux;
    let
      npm = import ./npm2nix.nix {
        pkgs = nixpkgs.legacyPackages.x86_64-linux;
        packageLockPath = ./package-lock.json;
      };

      treeSitterJavascriptWasm = stdenv.mkDerivation {
        name = "tree-sitter-javascript-wasm";
        dontUnpack = true;
        configurePhase = npm.setupNodeModules;
        buildInputs = [ emscripten ];
        buildPhase = ''
          cp -r node_modules/tree-sitter-javascript .
          chmod -R +w tree-sitter-javascript
          ${tree-sitter}/bin/tree-sitter build-wasm tree-sitter-javascript
        '';
        installPhase = ''
          mkdir $out
          cp tree-sitter-javascript.wasm $out
        '';
      };

    in
    {

      devShell.x86_64-linux = mkShellNoCC {
        buildInputs = [
          bun
          (npm.mkCommand { postNodeModulesModified = "direnv reload"; })
        ];
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
          cp ${treeSitterJavascriptWasm}/tree-sitter-javascript.wasm $out
        '';

      };

      packages.x86_64-linux.treesitter = treeSitterJavascriptWasm;


      apps.x86_64-linux.default = {
        type = "app";
        program = toString (writeShellScript "aabccd" ''
          echo aabccd022
        '');
      };
    };
}
