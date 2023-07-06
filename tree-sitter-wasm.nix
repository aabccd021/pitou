pkgs: treeSitters:
with pkgs;
let
  mkTreeSitterWasm = (lang:
    let
      wasmName = lib.trivial.pipe lang [
        (lib.removePrefix "tree-sitter-")
        (builtins.replaceStrings ["-"] ["_"])
      ];
    in
    stdenv.mkDerivation {
      name = "${lang}-wasm";
      dontUnpack = true;
      buildInputs = [ emscripten ];
      buildPhase = ''
        cp -rH ${pkgs.tree-sitter.grammars}/${lang}/. grammar
        chmod +w grammar
        ls grammar
        ${tree-sitter}/bin/tree-sitter build-wasm grammar
      '';
      installPhase = ''
        mkdir $out
        cp tree-sitter-${wasmName}.wasm $out
      '';
    });
in
lib.trivial.pipe pkgs.tree-sitter.grammars [
  builtins.readDir
  builtins.attrNames
  (builtins.map mkTreeSitterWasm)
  (builtins.concatStringsSep "\n")
  (treeSitterWasms: writeTextFile {
    name = "tree-sitters-wasms";
    text = treeSitterWasms + "\n";
  })
]
