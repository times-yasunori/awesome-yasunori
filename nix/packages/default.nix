{
  pkgs ? import <nixpkgs> { },
}:
let
  awesome-yasunori = ../..;
in
rec {
  default = yasunori-cli;
  yasunori-cli = pkgs.callPackage ./yasunori-cli {
    inherit awesome-yasunori;
  };
}
