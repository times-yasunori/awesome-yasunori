#!/usr/bin/env bash
set -euo pipefail

cd $(dirname ${BASH_SOURCE})

NODEJS_URL=$(nix --extra-experimental-features 'flakes nix-command' eval --raw --impure --expr '(import ./sources.nix).nodejs.url')
PNPM_URL=$(nix --extra-experimental-features 'flakes nix-command' eval --raw --impure --expr '(import ./sources.nix).pnpm.url')

NODEJS_HASH=$(nix --extra-experimental-features 'flakes nix-command' hash convert --hash-algo sha256 --to sri --from nix32 $(nix-prefetch-url $NODEJS_URL))
PNPM_HASH=$(nix --extra-experimental-features 'flakes nix-command' hash convert --hash-algo sha256 --to sri --from nix32 $(nix-prefetch-url $PNPM_URL))

# Nixがそのまま読めるのとシェルから吐きやすいのでTOMLを使用している
# 何かあってもJSONに置き換えるのは容易だと思われる
cat > sources_hash.toml << EOF
nodejs = "$NODEJS_HASH"
pnpm = "$PNPM_HASH"
EOF
