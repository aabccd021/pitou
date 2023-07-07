{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = inputs: with inputs.nixpkgs.legacyPackages.x86_64-linux;
    let
      pkgs = inputs.nixpkgs.legacyPackages.x86_64-linux;

      npm = import ./npm2nix.nix pkgs ./package-lock.json;

      nodeModulesDir = "$(${npm.command}/bin/npm root)";

      projectRoot = "$(${git}/bin/git rev-parse --show-toplevel)";

      setupNodeModules = writeShellScript "setupNodeModules" ''
        ln -sfn ${npm.nodeModules}/node_modules ${nodeModulesDir}
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

          rm -rf ${projectRoot}/tree-sitter-wasm
          mkdir ${projectRoot}/tree-sitter-wasm
          while read wasmDir
          do cp -rs "$wasmDir/." "${projectRoot}/tree-sitter-wasm/"
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
          while read wasmDir
          do cp -r $wasmDir/. $out/tree-sitter-wasm/
          done < ${treeSitterWasms}
        '';
      };

      apps.x86_64-linux = {
        dist = {
          type = "app";
          program = toString (writeShellScript "dist" ''
            cd ${projectRoot}
            nix build --offline && bun run result/dist/index.js
          '');
        };
        src = {
          type = "app";
          program = toString (writeShellScript "src" ''
            cd ${projectRoot}
            bun run src/index.ts
          '');
        };
      };
    };
}
