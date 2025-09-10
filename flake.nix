{
  description = "A curated list of awesome yasunori";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    treefmt-nix.url = "github:numtide/treefmt-nix";
    flake-parts.url = "github:hercules-ci/flake-parts";
    systems.url = "github:nix-systems/default";
    git-hooks-nix.url = "github:cachix/git-hooks.nix";
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
      git-hooks-nix,
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        treefmt-nix.flakeModule
        git-hooks-nix.flakeModule
        ./nix
      ];
      systems = import systems;

      perSystem =
        { pkgs, config, ... }:
        {
          checks = config.packages // {
            devShell = config.devShells.default;
          };
          pre-commit = {
            check = {
              enable = true;
            };
            settings = {
              src = ./.;
              hooks = {
                treefmt = {
                  enable = true;
                  packageOverrides.treefmt = config.treefmt.build.wrapper;
                };
              };
            };
          };
          treefmt = {
            projectRootFile = "flake.nix";
            flakeCheck = false;
            programs = {
              nixfmt.enable = true;
              taplo.enable = true;
            };
          };
        };
    };
}
