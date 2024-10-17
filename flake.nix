{
  description = "A curated list of awesome yasunori";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    treefmt-nix.url = "github:numtide/treefmt-nix";
    flake-parts.url = "github:hercules-ci/flake-parts";
    systems.url = "github:nix-systems/default";
  };

  nixConfig = {
    extra-substituters = [ "https://times-yasunori.cachix.org" ];
    extra-trusted-public-keys = [
      "times-yasunori.cachix.org-1:lPvJdWv48wRCargHe6ux2tTmaTBGK4uXdYVCpSHLx/A="
    ];
  };

  outputs =
    inputs@{
      self,
      systems,
      nixpkgs,
      treefmt-nix,
      flake-parts,
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        treefmt-nix.flakeModule
        ./nix
      ];
      systems = import systems;

      perSystem =
        { pkgs, ... }:
        {
          treefmt = {
            projectRootFile = "flake.nix";
            programs = {
              nixfmt.enable = true;
              taplo.enable = true;
            };
          };
        };
    };
}
