pkgs: treeSitters:
with pkgs;
let
  mkTreeSitterWasm = (lang: repo:
    stdenv.mkDerivation {
      name = "tree-sitter-wasm-${lang}";
      src = repo;
      buildInputs = [ emscripten ];
      buildPhase = ''
        cp -r $src grammar
        chmod +w grammar
        ${tree-sitter}/bin/tree-sitter build-wasm grammar
      '';
      installPhase = ''
        mkdir $out
        cp tree-sitter-${lang}.wasm $out
      '';
    });
in
lib.trivial.pipe treeSitters [
  (builtins.mapAttrs mkTreeSitterWasm)
  builtins.attrValues
  (builtins.concatStringsSep "\n")
  (treeSitterWasms: writeTextFile {
    name = "tree-sitters-wasms";
    text = treeSitterWasms + "\n";
  })
]
