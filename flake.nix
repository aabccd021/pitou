{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
    nix-filter.url = "github:numtide/nix-filter";
  };

  outputs = inputs: with inputs.nixpkgs.legacyPackages.x86_64-linux;
    let
      pkgs = inputs.nixpkgs.legacyPackages.x86_64-linux;

      filter = inputs.nix-filter.lib;

      nodeModules = import ./nix/npm2nix.nix pkgs ./package-lock.json;

      nodeModulesDir = "$(${npm}/bin/npm root)";

      npm = import ./nix/packageOnlyNpm.nix pkgs;

      projectRoot = "$(${git}/bin/git rev-parse --show-toplevel)";

      setupNodeModules = writeShellScript "setupNodeModules" ''
        ln -sfn ${nodeModules}/lib/node_modules ${nodeModulesDir}
      '';

      treeSitterWasms = import ./nix/tree-sitter-wasm.nix pkgs {
        tree-sitter-javascript = true;
        tree-sitter-nix = true;
        tree-sitter-typescript = true;
      };

      page = { runFile, dependencies ? [], outFile }: stdenv.mkDerivation {
        name = "page" + runFile;
        src = filter {
          root = ./src;
          include = dependencies ++ [ runFile ];
        };
        buildPhase = ''
          mkdir -p ./src
          cp -r $src/. ./src

          file_path=./src/${runFile}
          if [ ! -f $file_path ]; then
            echo File does not exist: $file_path
            exit 1
          fi

          ln -sfn ${nodeModules}/lib/node_modules ./node_modules

          mkdir -p $out/public
          ${bun}/bin/bun run $file_path > $out/public/${outFile}
        '';
      };

      htmlYo = page {
        runFile = "blog/index.html.ts";
        dependencies = [
          "style.css.ts"
          "meta.ts"
          "html.ts"
          "staticUrl.ts"
          "cssUtil.ts"
        ];
        outFile = "./index.html";
      };

      logo = stdenv.mkDerivation
        {
          name = "logo";
          dontUnpack = true;
          nativeBuildInputs = [ imagemagick ];
          buildPhase = ''
            convert ${./src/public/logo.svg} logo.png
          '';
          installPhase = ''
            mkdir -p $out/public
            cp logo.png $out/public
          '';
        };

    in
    {
      devShell.x86_64-linux = mkShell {
        buildInputs = [
          bun
          npm
          imagemagick
          (writeShellScriptBin "run" ''
            bun run ${projectRoot}/src/index.ts "$@"
          '')
          (writeShellScriptBin "dev" ''
            cd ${projectRoot}
            bun --hot ${projectRoot}/src/dev.ts "$@"
          '')
          (writeShellScriptBin "lint" ''
            eslint ${projectRoot} --ignore-path ${projectRoot}/.gitignore --max-warnings 0 "$@"
          '')
        ];
        shellHook = ''
          ${setupNodeModules}
          export PATH=node_modules/.bin:$PATH
        '';
      };

      packages.x86_64-linux.default = stdenv.mkDerivation {
        name = "public";
        dontUnpack = true;
        buildPhase = ''
          mkdir public
          cp -r ${logo}/public/. public
          cp -r ${htmlYo}/public/. public
        '';
        installPhase = ''
          mkdir $out
          cp -r public $out
        '';
      };
    };
}
