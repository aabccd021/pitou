pkgs: treeSitters:
with pkgs;
let

  grammars' = lib.trivial.pipe pkgs.tree-sitter.grammars [
    builtins.readDir
    (lib.mapAttrs (dirname: _: { dirname = dirname; }))
  ];

  # https://github.com/NixOS/nixpkgs/blob/c99004f75fd28cc10b9d2e01f51a412d768269c8/pkgs/development/tools/parsing/tree-sitter/default.nix#L67-L74
  grammars = grammars' //
    { tree-sitter-ocaml = grammars'.tree-sitter-ocaml // { location = "ocaml"; }; } //
    { tree-sitter-ocaml-interface = grammars'.tree-sitter-ocaml // { location = "interface"; }; } //
    { tree-sitter-org-nvim = grammars'.tree-sitter-org-nvim // { language = "org"; }; } //
    { tree-sitter-typescript = grammars'.tree-sitter-typescript // { location = "typescript"; }; } //
    { tree-sitter-tsx = grammars'.tree-sitter-typescript // { location = "tsx"; }; } //
    { tree-sitter-markdown = grammars'.tree-sitter-markdown // { location = "tree-sitter-markdown"; }; } //
    { tree-sitter-markdown-inline = grammars'.tree-sitter-markdown // { language = "markdown_inline"; location = "tree-sitter-markdown-inline"; }; };

  buildGrammarWasm = import ./grammar-wasm.nix pkgs;

  builtGrammarsWasm =
    let
      buildWasm = name: grammar:
        buildGrammarWasm {
          language = name;
          inherit (grammar) dirname;
          location = grammar.location or null;
          wasmName = grammar.wasmName or
            grammar.language or
              (lib.strings.replaceStrings [ "-" ] [ "_" ]
                (lib.strings.removePrefix "tree-sitter-" name));
        };

      wasmGrammars = grammars //
        ((builtins.removeAttrs) [
          # Doesn't build
          "tree-sitter-llvm"
        ])
          { tree-sitter-ql-dbscheme = grammars'.tree-sitter-ql-dbscheme // { wasmName = "dbscheme"; }; };
    in
    lib.mapAttrs buildWasm (wasmGrammars);
in
lib.trivial.pipe builtGrammarsWasm [
  (builtins.attrValues)
  (builtins.concatStringsSep "\n")
  (treeSitterWasms: writeTextFile {
    name = "tree-sitters-wasms";
    text = treeSitterWasms + "\n";
  })
]
