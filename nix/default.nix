{ self, ... }:
{
  imports = [
    ./shells
  ];

  flake = {
    overlays = import ./overlays.nix;
  };

  perSystem =
    {
      system,
      ...
    }:
    let
      pkgs = import self.inputs.nixpkgs {
        inherit system;
        overlays = [ self.overlays.toolchain ];
      };
    in
    {
      _module.args.pkgs = pkgs;
      packages = rec {
        default = yasunori-cli;
        yasunori-cli = pkgs.callPackage ./packages/yasunori-cli { };
      };
    };
}
