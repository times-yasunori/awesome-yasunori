{ self, ... }:
{
  flake = {
    overlays = import ./overlays.nix;
  };

  perSystem =
    {
      system,
      ...
    }:
    {
      _module.args.pkgs = import self.inputs.nixpkgs {
        inherit system;
        overlays = [ self.overlays.toolchain ];
      };
    };
}
