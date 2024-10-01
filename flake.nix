{
  description = "A curated list of awesome yasunori";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    treefmt-nix.url = "github:numtide/treefmt-nix";
    flake-parts.url = "github:hercules-ci/flake-parts";
    systems.url = "github:nix-systems/default";
    readmegen.url = "github:satler-git/awesome-yasunori-readmegen";
  };

  outputs =
    inputs@{
      self,
      systems,
      nixpkgs,
      treefmt-nix,
      flake-parts,
      readmegen,
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [ treefmt-nix.flakeModule ];
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

          devShells.default = pkgs.mkShell { packages = with pkgs; [ nil ]; };

          packages.default = pkgs.stdenv.mkDerivation {
            name = "readme";

            src = lib.cleanSource ./.;

            buildInputs = [readmegen.packages.default];

            buildPhase = ''
              ${readmegen.packages.default}/bin/readmegen yasunori.toml > README.md
            '';

            installPhase = ''
              cp ./README.md $out/
            '';
          };
        };
    };
}
