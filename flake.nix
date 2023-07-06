{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = inputs: with inputs.nixpkgs.legacyPackages.x86_64-linux;
    let
      pkgs = inputs.nixpkgs.legacyPackages.x86_64-linux;

      npm = import ./npm2nix.nix pkgs ./package-lock.json;

      setupNodeModules = writeShellScript "setupNodeModules" ''
        ln -sfn ${npm.nodeModules}/node_modules "$(${npm.command}/bin/npm root)"
      '';

      treeSitterWasms = import ./tree-sitter-wasm.nix pkgs {
        javascript = inputs.tree-sitter-javascript;
        nix = inputs.tree-sitter-nix;
      };

      setupTreeSitterWasms = writeShellScript "setupTreeSitterWasms" ''
        mkdir -p ${treeSitterWasms}
        while read wasm 
        do cp -r "$wasm/." $1
        done < ${treeSitterWasms}
      '';
    in
    {

      devShell.x86_64-linux = mkShellNoCC {
        buildInputs = [ bun npm.command ];
        shellHook = ''
          ${setupNodeModules}
          ${setupTreeSitterWasms} ./src
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
          mkdir $out
          cp dist/index.js $out
          ${setupTreeSitterWasms} $out
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
