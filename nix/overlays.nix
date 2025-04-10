{
  toolchain =
    final: prev:
    let
      # TODO: parse from .npmrc and package.json
      nodeVersion = "20.19.0";
      pnpmVersion = "9.15.9";
    in
    {
      nodejs = prev.nodejs_20.overrideAttrs (oldAttrs: {
        version = nodeVersion;
        src = prev.fetchurl {
          url = "https://nodejs.org/dist/v${nodeVersion}/node-v${nodeVersion}.tar.xz";
          hash = "sha256-WsJRb8kFtqC8GjPnMCk36sZkqCC4h8yGvUjANfujktc=";
        };
      });
      pnpm = prev.pnpm_9.overrideAttrs (oldAttrs: {
        version = pnpmVersion;
        src = prev.fetchurl {
          url = "https://registry.npmjs.org/pnpm/-/pnpm-${pnpmVersion}.tgz";
          hash = "sha256-z4anrXZEBjldQoam0J1zBxFyCsxtk+nc6ax6xNxKKKc=";
        };
      });
    };
}
