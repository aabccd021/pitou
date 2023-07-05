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
{
  nodeModules = stdenv.mkDerivation {
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

      mkdir "$out"
      cd "$out"
      cp ${packageLockPath} ./package-lock.json
      npm ci --ignore-scripts --offline
      rm package-lock.json
    '';
  };

  command = writeShellScriptBin "npm" ''
    array_includes() {
        local word=$1
        shift
        for el in "$@"; do [[ "$el" == "$word" ]] && return 0; done
    }

    if ! array_includes install "$@" \
       && ! array_includes uninstall "$@" \
       && ! array_includes dedupe "$@" \
       && ! array_includes ci "$@" \
    ; then
      "${nodejs}/bin/npm" "$@"
      exit 0
    fi
          
    rm -rf "$("${nodejs}/bin/npm" root)"
    ${nodejs}/bin/npm "$@" --package-lock-only
  '';
}
