pkgs: treeSitters:
with pkgs;

lib.trivial.pipe pkgs.tree-sitter.grammars [
  builtins.readDir
  (builtins.mapAttrs (dirname: _: { dirname = dirname; }))


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

  # wasm fix
  (grammars':
    grammars' //
    { tree-sitter-ql-dbscheme = grammars'.tree-sitter-ql-dbscheme // { wasmName = "dbscheme"; }; }
  )
  ((lib.trivial.flip removeAttrs) [ "tree-sitter-llvm" ])

  (builtins.mapAttrs (name: { location ? null, ... }@grammar:
    let
      wasmName = grammar.wasmName
        or grammar.language
        or (lib.trivial.pipe name [
        (lib.removePrefix "tree-sitter-")
        (builtins.replaceStrings [ "-" ] [ "_" ])
      ]);
    in
    stdenv.mkDerivation {
      name = "${name}-wasm";

      src = pkgs.tree-sitter.grammars;

      configurePhase = ''
        cp -rH $src/${grammar.dirname}/. grammar
        chmod -R +w grammar
        cd grammar
      '' + lib.optionalString (location != null) ''
        cd ${location}
      '';

      nativeBuildInputs = [ emscripten ];

      buildPhase = ''
        runHook preBuild

        ls
        ${tree-sitter}/bin/tree-sitter build-wasm .

        runHook postBuild
      '';

      installPhase = ''
        runHook preInstall

        mkdir $out
        ls
        cp tree-sitter-${wasmName}.wasm $out

        runHook postInstall
      '';
    }))

  (builtins.attrValues)
  (builtins.concatStringsSep "\n")
  (treeSitterWasms: writeTextFile {
    name = "tree-sitters-wasms";
    text = treeSitterWasms + "\n";
  })
]
