{
  perSystem =
    { pkgs, ... }:
    {
      packages = {
        yasunori-net = pkgs.callPackage ./yasunori-net { };
      };
    };
}
