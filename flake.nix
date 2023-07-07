{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = inputs: with inputs.nixpkgs.legacyPackages.x86_64-linux;
    let
      pkgs = inputs.nixpkgs.legacyPackages.x86_64-linux;

      npm = import ./npm2nix.nix pkgs ./package-lock.json;

      projectRoot = ''
        "$(${npm.command}/bin/npm root)"
      '';

      setupNodeModules = writeShellScript "setupNodeModules" ''
        ln -sfn ${npm.nodeModules}/node_modules ${projectRoot}
      '';

      treeSitterWasms = import ./tree-sitter-wasm.nix pkgs {
        tree-sitter-javascript = true;
        tree-sitter-nix = true;
        tree-sitter-typescript = true;
      };
 
    in
    {

      devShell.x86_64-linux = mkShellNoCC {
        buildInputs = [ bun npm.command ];
        shellHook = ''
          ${setupNodeModules}

          mkdir -p ${projectRoot}/tree-sitter-wasm
          while read wasm 
          do ln -s "$wasm/." $out/tree-sitter-wasm
          done < ${treeSitterWasms}
        '';
      };

      packages.x86_64-linux.default = stdenv.mkDerivation {
        name = "pitou";
        src = ./src;
        unpackPhase = ''
          cp -r "$src" ./src
        '';
        configurePhase = setupNodeModules;
        buildPhase = ''
          ${bun}/bin/bun build ./src/index.ts --target bun --outfile ./dist/index.js
        '';
        installPhase = ''
          mkdir -p $out/dist
          cp dist/index.js $out/dist/index.js

          mkdir -p $out/tree-sitter-wasm
          ls $out
          ls $out/tree-sitter-wasm

          echo aab
          echo ${treeSitterWasms}
          cat ${treeSitterWasms}
          echo ccd

          while read package 
          do 
            echo a
            echo "$package"
            ls "$package"
            echo b
            cp -r $wasm/. $out/tree-sitter-wasm/
          done < ${treeSitterWasms}
        '';
      };

      apps.x86_64-linux.default = {
        type = "app";
        program = toString (writeShellScript "aabccd" ''
          ls ${pkgs.tree-sitter.grammars}
        '');
      };
    };
}
