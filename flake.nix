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

      page =
        { runFile
        , outFile
        , requiredFiles ? [ ]
        }: stdenv.mkDerivation {
          name = "page-" + runFile;
          src = filter {
            root = ./src;
            include = requiredFiles ++ [ runFile ];
          };
          buildPhase = ''
            mkdir public
            mkdir -p ./src
            cp -r $src/. ./src

            ln -sfn ${nodeModules}/lib/node_modules ./node_modules

            cp ${./src/generate.ts} generate.ts

            PATH_TO_GENERATE=./src/${runFile} ${bun}/bin/bun run generate.ts
          '';
          installPhase = ''
            mkdir -p $out/public
            cp -r public/. $out/public
            mkdir -p $out/public/$(dirname ${outFile})
            cp result $out/public/${outFile}
          '';
        };

      cssYo = page {
        runFile = "blog/style.css.ts";
        requiredFiles = [
          "style.ts"
          "cssUtil.ts"
        ];
        outFile = "./style.css";
      };

      logo = stdenv.mkDerivation {
        name = "logo";
        dontUnpack = true;
        nativeBuildInputs = [ imagemagick ];
        buildPhase = ''
          convert -background none ${./src/public/logo.svg} logo.png
        '';
        installPhase = ''
          mkdir -p $out/public
          cp logo.png $out/public
        '';
      };

      htmlYo = page {
        runFile = "blog/index.html.ts";
        requiredFiles = [
          "style.ts"
          "meta.ts"
          "html.ts"
          "staticUrls.ts"
          "cssUtil.ts"
        ];
        outFile = "./index.html";
      };

      staticFiles = [ htmlYo cssYo logo ];

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
          (writeShellScriptBin "serve" ''
            cd ${projectRoot}
            bun  ${projectRoot}/src/serve.ts "$@"
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
        name = "staticFiles";
        dontUnpack = true;
        dontBuild = true;
        installPhase = ''
          mkdir -p $out/public
          ${builtins.concatStringsSep "\n" (map (f: "cp -rs ${f}/public/. $out/public") staticFiles)}
        '';
      };
    };
}
