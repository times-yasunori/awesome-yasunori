{
  toolchain =
    final: prev:
    let
      # TODO: parse from .npmrc and package.json
      nodeVersion = "20.17.0";
      pnpmVersion = "9.11.0";
    in
    {
      nodejs = prev.nodejs_20.overrideAttrs (oldAttrs: {
        version = nodeVersion;
        src = prev.fetchurl {
          url = "https://nodejs.org/dist/v${nodeVersion}/node-v${nodeVersion}.tar.xz";
          hash = "sha256-mr8DrCM2LGA4frtjOlFjA2NxRcs8F3vjNIsWiA/Ysow=";
        };
      });
      pnpm = prev.pnpm_9.overrideAttrs (oldAttrs: {
        version = pnpmVersion;
        src = prev.fetchurl {
          url = "https://registry.npmjs.org/pnpm/-/pnpm-${pnpmVersion}.tgz";
          hash = "sha256-HA4z9w5d+e7ehKNXvfoLH526blgZRijUihBVdW9VN1Q=";
        };
      });
    };
}
