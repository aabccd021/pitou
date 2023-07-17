pkgs: with pkgs;
writeShellScriptBin "npm" ''
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
''
