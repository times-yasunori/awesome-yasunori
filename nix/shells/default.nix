{ inputs, ... }:
{
  perSystem =
    {
      system,
      pkgs,
      config,
      ...
    }:
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
          inputsFrom = [
            config.pre-commit.devShell
            config.treefmt.build.devShell
            inputs.self.packages.${system}.yasunori-net
          ];
        };
      };
    };
}
