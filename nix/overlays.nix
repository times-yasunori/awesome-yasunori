{
  toolchain =
    final: prev:
    let
      # TODO: prepare prefetch script
      packageJson = builtins.fromJSON (builtins.readFile ../package.json);
      nodeVersion = builtins.replaceStrings [ "^" ] [ "" ] packageJson.devEngines.runtime.version;
      pnpmVersion = builtins.replaceStrings [ "pnpm@" ] [ "" ] packageJson.packageManager;
    in
    {
      nodejs = prev.nodejs_22.overrideAttrs (oldAttrs: {
        version = nodeVersion;
        src = prev.fetchurl {
          url = "https://nodejs.org/dist/v${nodeVersion}/node-v${nodeVersion}.tar.xz";
          hash = "sha256-Eg4PdEGQl6n6+uH9gLned5Glh+bxxIwisZMjnM0PcIQ=";
        };
      });
      pnpm = prev.pnpm_9.overrideAttrs (oldAttrs: {
        version = pnpmVersion;
        src = prev.fetchurl {
          url = "https://registry.npmjs.org/pnpm/-/pnpm-${pnpmVersion}.tgz";
          hash = "sha256-hMGeeI19fuJI5Ka3FS+Ou6D0/nOApfRDyhfXbAMAUtI=";
        };
      });
    };
}
