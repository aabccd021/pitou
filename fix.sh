prefetch-npm-deps package-lock.json | sed --in-place "s@sha256.*@$(cat)\";@" flake.nix \
