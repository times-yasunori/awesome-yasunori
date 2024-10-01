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
        { pkgs, system, ... }:
        rec {
          treefmt = {
            projectRootFile = "flake.nix";
            programs = {
              nixfmt.enable = true;
              taplo.enable = true;
            };
          };

          devShells.default = pkgs.mkShell { packages = with pkgs; [ nil ]; };

          packages.default = packages.readme;

          packages.readme = pkgs.stdenv.mkDerivation {
            name = "readme";

            src = nixpkgs.lib.cleanSource ./.;

            buildInputs = [ readmegen.packages."${system}".default ];

            buildPhase = ''
              ${readmegen.packages."${system}".default}/bin/readmegen yasunori.toml > README.md
            '';

            installPhase = ''
              mkdir $out/
              cp ./README.md $out/README.md
            '';
          };
        };
    };
}
