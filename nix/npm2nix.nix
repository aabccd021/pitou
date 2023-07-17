pkgs: packageLockPath: with pkgs;
let
  packageLock = lib.trivial.pipe
    packageLockPath [
    builtins.readFile
    builtins.fromJSON
  ];

  tarballsFile = lib.trivial.pipe (packageLock.packages) [
    (lib.trivial.flip removeAttrs [ "" ])
    builtins.attrValues

    (map (package: fetchurl {
      url = package.resolved;
      hash = package.integrity;
    }))

    (builtins.concatStringsSep "\n")

    (tarballs: writeTextFile {
      name = "${packageLock.name}-${packageLock.version}-tarballs";
      text = tarballs + "\n";
    })
  ];
in
stdenv.mkDerivation {
  pname = "${packageLock.name}-node-modules";
  version = packageLock.version;
  buildInputs = [ nodejs ];
  dontUnpack = true;
  buildPhase = ''
    export HOME="$TMP/.home"
    npm config set progress false

    while read package
    do npm cache add "$package"
    done < ${tarballsFile}

    mkdir -p "$out/lib"
    cd "$out/lib"
    cp ${packageLockPath} ./package-lock.json
    npm ci --ignore-scripts --offline
    rm package-lock.json
  '';
}
