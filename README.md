# pitou
Utility functions to build website

# Remote Build
```bash
rsync --filter=':- .gitignore' -avrP ../pitou contabo-gh:~/ && ssh contabo-gh "cd pitou && /nix/var/nix/profiles/default/bin/nix build --max-jobs 8 --cores 8"
```
