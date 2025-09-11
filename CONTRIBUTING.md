# Contribution Guidelines

- **To add to the list:** Submit a pull request
- **To remove from the list:** Open an issue

## Reporting issues

Please open an issue if you find anything that could be improved or have suggestions for making the list a more valuable tweet.

## Development notes

- If you update the Node.js or pnpm version in `package.json`, run `nix/update_sources_hash.sh` to refresh the Nix source hashes.
    - If you don't have Nix installed, enable "Allow edits by maintainers" on your PR and we can update the hashes for you.
