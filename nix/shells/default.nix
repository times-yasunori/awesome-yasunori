{
  perSystem =
    { pkgs, ... }:
    {
      devShells = {
        default = pkgs.mkShellNoCC {
          packages = [
            pkgs.nil
            pkgs.nodejs
            pkgs.pnpm
          ];
          shellHook = ''
            ${pkgs.figlet}/bin/figlet AWESOME YASUNORI
          '';
        };
      };
    };
}
