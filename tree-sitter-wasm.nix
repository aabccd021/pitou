pkgs: treeSitters:
with pkgs;
let

  buildWasm = (key: { dirname, language, location, wasmName }:
    stdenv.mkDerivation {
      name = "${key}-wasm";
      dontUnpack = true;
      buildInputs = [ emscripten ];
      buildPhase = ''
        cp -rH ${pkgs.tree-sitter.grammars}/${dirname}/${location}/. grammar
        chmod +w grammar
        ls grammar
        ${tree-sitter}/bin/tree-sitter build-wasm grammar
      '';
      installPhase = ''
        mkdir $out
        ls
        cp tree-sitter-${wasmName}.wasm $out
      '';
    });
in
lib.trivial.pipe pkgs.tree-sitter.grammars [
  builtins.readDir
  (builtins.mapAttrs (dirname: _:
    let
      language = lib.trivial.pipe dirname [
        (lib.removePrefix "tree-sitter-")
        (builtins.replaceStrings [ "-" ] [ "_" ])
      ];
    in
    {
      inherit language;
      dirname = dirname;
      location = ".";
    })
  )

  ((lib.trivial.flip removeAttrs) [
    "tree-sitter-ocaml"
    "tree-sitter-typescript"
    "tree-sitter-llvm"
    # "tree-sitter-perl"
    # "tree-sitter-julia"
    # "tree-sitter-vim"
  ])

  # https://github.com/NixOS/nixpkgs/blob/c99004f75fd28cc10b9d2e01f51a412d768269c8/pkgs/development/tools/parsing/tree-sitter/default.nix#L67-L74
  (grammars':
    grammars' //
    # { tree-sitter-ocaml = grammars'.tree-sitter-ocaml // { location = "ocaml"; }; } //
    # { tree-sitter-ocaml-interface = grammars'.tree-sitter-ocaml // { location = "interface"; }; } //
    { tree-sitter-org-nvim = grammars'.tree-sitter-org-nvim // { language = "org"; }; } //
    # { tree-sitter-typescript = grammars'.tree-sitter-typescript // { location = "typescript"; }; } //
    # { tree-sitter-tsx = grammars'.tree-sitter-typescript // { location = "tsx"; }; } //
    { tree-sitter-markdown = grammars'.tree-sitter-markdown // { location = "tree-sitter-markdown"; }; } //
    { tree-sitter-markdown-inline = grammars'.tree-sitter-markdown // { language = "markdown_inline"; location = "tree-sitter-markdown-inline"; }; }
  )

  (builtins.mapAttrs (_: grammar: grammar // { wasmName = grammar.language; }))

  # wasm fix
  (grammars': grammars' //
    { tree-sitter-ql-dbscheme = grammars'.tree-sitter-ql-dbscheme // { wasmName = "dbscheme"; }; }
  )

  (builtins.mapAttrs buildWasm)
  (builtins.attrValues)
  (builtins.concatStringsSep "\n")
  (treeSitterWasms: writeTextFile {
    name = "tree-sitters-wasms";
    text = treeSitterWasms + "\n";
  })
]
