{ pkgs }:

pkgs.mkShell {
  name = "yasunori-clojure-devshell";
  packages = with pkgs; [
    clojure
    clj-kondo
  ];
}
