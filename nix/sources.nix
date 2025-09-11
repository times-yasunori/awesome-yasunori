let
  packageJson = builtins.fromJSON (builtins.readFile ../package.json);
  nodeVersion = builtins.replaceStrings [ "^" ] [ "" ] packageJson.devEngines.runtime.version;
  pnpmVersion = builtins.replaceStrings [ "pnpm@" ] [ "" ] packageJson.packageManager;
  hashes = builtins.fromTOML (builtins.readFile ./sources_hash.toml);
in
{
  nodejs = {
    version = nodeVersion;
    src = {
      url = "https://nodejs.org/dist/v${nodeVersion}/node-v${nodeVersion}.tar.xz";
      hash = hashes.nodejs;
    };
  };
  pnpm = {
    version = pnpmVersion;
    src = {
      url = "https://registry.npmjs.org/pnpm/-/pnpm-${pnpmVersion}.tgz";
      hash = hashes.pnpm;
    };
  };
}
