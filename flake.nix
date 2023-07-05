{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";

    tree-sitter-javascript = {
      url = "github:tree-sitter/tree-sitter-javascript";
      flake = false;
    };
  };

  outputs = inputs: with inputs.nixpkgs.legacyPackages.x86_64-linux;
    let
      npm = import ./npm2nix.nix {
        pkgs = inputs.nixpkgs.legacyPackages.x86_64-linux;
        packageLockPath = ./package-lock.json;
      };

      treeSitters = {
        javascript = inputs.tree-sitter-javascript;
      };

      makeTreeSitterWasm = ((lang: repo:
        stdenv.mkDerivation {
          name = "tree-sitter-wasm-${lang}";
          src = repo;
          buildInputs = [ emscripten ];
          buildPhase = ''
            cp -r $src grammar
            chmod +w grammar
            ${tree-sitter}/bin/tree-sitter build-wasm grammar
          '';
          installPhase = ''
            mkdir $out
            cp tree-sitter-${lang}.wasm $out
          '';
        }
      ) treeSitters);

      treeSitterWasm.javascript = stdenv.mkDerivation {
        name = "tree-sitter-wasm-javascript";
        src = inputs.tree-sitter-javascript;
        buildInputs = [ emscripten ];
        buildPhase = ''
          cp -r $src grammar
          chmod +w grammar
          ${tree-sitter}/bin/tree-sitter build-wasm grammar
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
          cp ${treeSitterWasm.javascript}/tree-sitter-javascript.wasm $out
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
