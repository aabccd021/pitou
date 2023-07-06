{ lib
, tree-sitter
, stdenv
, emscripten
, ...
}:

{ language
, wasmName
, dirname
, location ? null
, ...
}@args:

stdenv.mkDerivation ({
  name = "${language}-grammar-wasm";

  src = tree-sitter.grammars;

  nativeBuildInputs = [ emscripten ];

  configurePhase = ''
    cp -rH $src/${dirname}/. grammar
    chmod -R +w grammar
    cd grammar
  '' + lib.optionalString (location != null) ''
    cd ${location}
  '';

  buildPhase = ''
    runHook preBuild

    ${tree-sitter}/bin/tree-sitter build-wasm .

    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall

    mkdir $out
    cp tree-sitter-${wasmName}.wasm $out

    runHook postInstall
  '';
} // removeAttrs args [ "language" "wasmName" "dirname" "location" ])
