{
  perSystem =
    { pkgs, config, ... }:
    {
      devShells = {
        default = pkgs.mkShellNoCC {
          packages = [
            pkgs.nil
            pkgs.nodejs
            pkgs.pnpm

            pkgs.dotnetCorePackages.sdk_8_0
          ];
          shellHook = ''
            ${pkgs.figlet}/bin/figlet AWESOME YASUNORI
          '';
          inputsFrom = [
            config.pre-commit.devShell
            config.treefmt.build.devShell
          ];
        };
      };
    };
}
