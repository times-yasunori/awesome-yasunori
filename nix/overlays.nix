{
  toolchain =
    final: prev:
    let
      sources = import ./sources.nix;
    in
    {
      nodejs = prev.nodejs_22.overrideAttrs (oldAttrs: {
        version = sources.pnpm.version;
        src = prev.fetchurl sources.nodejs.src;
      });
      pnpm = prev.pnpm_9.overrideAttrs (oldAttrs: {
        version = sources.pnpm.version;
        src = prev.fetchurl sources.pnpm.src;
      });
    };
}
