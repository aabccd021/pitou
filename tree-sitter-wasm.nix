pkgs: treeSitters:
with pkgs;
let

  buildWasm = (key: { dirname, language, location }:
    stdenv.mkDerivation {
      name = "${key}-wasm";
      dontUnpack = true;
      buildInputs = [ emscripten ];
      buildPhase = ''
        cp -rH ${pkgs.tree-sitter.grammars}/${dirname}/. grammar
        chmod -R +w grammar
        cd grammar
        cd ${location}
        ls
        ${tree-sitter}/bin/tree-sitter build-wasm .
      '';
      installPhase = ''
        mkdir $out
        ls
        cp tree-sitter-${language}.wasm $out
      '';
    });
in
lib.trivial.pipe pkgs.tree-sitter.grammars [
  builtins.readDir
  (builtins.mapAttrs (dirname: _: { dirname = dirname; location = "."; }))

  ((lib.trivial.flip removeAttrs) [ "tree-sitter-llvm" ])

  # https://github.com/NixOS/nixpkgs/blob/c99004f75fd28cc10b9d2e01f51a412d768269c8/pkgs/development/tools/parsing/tree-sitter/default.nix#L67-L74
  (grammars':
    grammars' //
    { tree-sitter-ocaml = grammars'.tree-sitter-ocaml // { location = "ocaml"; }; } //
    { tree-sitter-ocaml-interface = grammars'.tree-sitter-ocaml // { location = "interface"; }; } //
    { tree-sitter-org-nvim = grammars'.tree-sitter-org-nvim // { language = "org"; }; } //
    { tree-sitter-typescript = grammars'.tree-sitter-typescript // { location = "typescript"; }; } //
    { tree-sitter-tsx = grammars'.tree-sitter-typescript // { location = "tsx"; }; } //
    { tree-sitter-markdown = grammars'.tree-sitter-markdown // { location = "tree-sitter-markdown"; }; } //
    { tree-sitter-markdown-inline = grammars'.tree-sitter-markdown // { language = "markdown_inline"; location = "tree-sitter-markdown-inline"; }; }
  )

  (builtins.mapAttrs (key: grammar: grammar // {
    language = lib.trivial.pipe key [
      (lib.removePrefix "tree-sitter-")
      (builtins.replaceStrings [ "-" ] [ "_" ])
    ];
  }))

  # wasm fix
  (grammars': grammars' //
    { tree-sitter-ql-dbscheme = grammars'.tree-sitter-ql-dbscheme // { language = "dbscheme"; }; }
  )

  (builtins.mapAttrs buildWasm)
  (builtins.attrValues)
  (builtins.concatStringsSep "\n")
  (treeSitterWasms: writeTextFile {
    name = "tree-sitters-wasms";
    text = treeSitterWasms + "\n";
  })
]
