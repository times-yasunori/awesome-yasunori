{ self, ... }:
{
  imports = [
    ./shells
    ./packages
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
      packages = import ./packages { inherit pkgs; };
    };
}
