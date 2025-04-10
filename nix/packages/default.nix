{
  perSystem =
    { pkgs, ... }:
    {
      packages = rec {
        default = yasunori-cli;
        yasunori-cli = pkgs.callPackage ./yasunori-cli {
          awesome-yasunori = ../..;
        };
        yasunori-net = pkgs.callPackage ./yasunori-net { };
        yasunori-mcp = pkgs.callPackage ./mcp { };
      };
    };
}
