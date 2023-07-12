{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = inputs: with inputs.nixpkgs.legacyPackages.x86_64-linux;
    let
      pkgs = inputs.nixpkgs.legacyPackages.x86_64-linux;

      nodeModules = import ./npm2nix.nix pkgs ./package-lock.json;

      nodeModulesDir = "$(${npm}/bin/npm root)";

      npm = import ./packageOnlyNpm.nix pkgs;

      projectRoot = "$(${git}/bin/git rev-parse --show-toplevel)";

      setupNodeModules = writeShellScript "setupNodeModules" ''
        ln -sfn ${nodeModules}/lib/node_modules ${nodeModulesDir}
      '';

      treeSitterWasms = import ./tree-sitter-wasm.nix pkgs {
        tree-sitter-javascript = true;
        tree-sitter-nix = true;
        tree-sitter-typescript = true;
      };

    in
    {
      devShell.x86_64-linux = mkShellNoCC {
        buildInputs = scripts ++ [
          bun
          npm
          (writeShellScriptBin "run" ''
            cd ${projectRoot}
            bun run src/index.ts
          '')
          (writeShellScriptBin "dist" ''
            cd ${projectRoot}
            nix build --offline && bun run result/dist/index.js
          '')
          (writeShellScriptBin "dev" ''
            cd ${projectRoot}
            bun --hot src/dev.ts
          '')
        ];
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
          cp ${./package.json} ./package.json
        '';
        configurePhase = setupNodeModules;
        buildPhase = ''
          ${bun}/bin/bun build ./src/index.ts \
            --splitting \
            --target browser \
            --no-bundle \
            --outfile ./dist/index.js
        '';
        installPhase = ''
          mkdir -p $out/dist
          cp -r dist $out

          mkdir -p $out/tree-sitter-wasm
          while read wasmDir
          do cp -r $wasmDir/. $out/tree-sitter-wasm/
          done < ${treeSitterWasms}
        '';
      };
    };
}
