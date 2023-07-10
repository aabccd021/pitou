{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = inputs: with inputs.nixpkgs.legacyPackages.x86_64-linux;
    let
      pkgs = inputs.nixpkgs.legacyPackages.x86_64-linux;

      nodeModules = import ./npm2nix.nix pkgs ./package-lock.json;

      eslintNodeModules = import ./npm2nix.nix pkgs ./eslint/package-lock.json;

      aab = stdenv.mkDerivation
        {
          name = "aab";
          dontUnpack = true;
          nativeBuildInputs = [ makeWrapper ];
          buildPhase = ''
            mkdir -p "$out/lib"
            mkdir -p "$out/bin"

            find ${eslintNodeModules}/lib/node_modules -maxdepth 1 ! -name ".bin" -exec ln -s {} "$out/lib/node_modules" \;
            echo '{ "extends": "@antfu" }' > "$out/lib/.eslintrc.json"

            for f in $out/lib/node_modules/.bin/*; do
               path="$(readlink --canonicalize-missing "$f")"
               ln -s "$path" "$out/bin/$(basename $f)"
            done
          '';
        };

      eef = pkgs.symlinkJoin {
        name = "eef";
        paths = [ aab ];
        nativeBuildInputs = [ makeWrapper ];
        postBuild = ''
          wrapProgram "$out/bin/eslint" \
            --add-flags "--config ${aab}/lib/.eslintrc.json"
        '';
      };

      ccd = stdenv.mkDerivation {
        name = "ccd";
        dontUnpack = true;
        buildPhase = ''
          mkdir -p "$out/lib/node_modules/.bin"
          ln -s "${eef}/bin/eslint" "$out/lib/node_modules/.bin/eslint"
        '';
      };


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
        buildInputs = [
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
          (writeShellScriptBin "lint" ''
            ${ccd}/bin/eslint ${projectRoot}/**/*.ts
          '')

        ];
        shellHook = ''
          ${setupNodeModules}
          export PATH=${ccd}/lib/node_modules/.bin:$PATH

          rm -rf ${projectRoot}/tree-sitter-wasm
          mkdir ${projectRoot}/tree-sitter-wasm
          while read wasmDir
          do cp -rfs "$wasmDir/." "${projectRoot}/tree-sitter-wasm/"
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
    };
}
