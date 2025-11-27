{
  lib,
  buildDotnetModule,
  dotnetCorePackages,
}:

buildDotnetModule {
  pname = "yasunori.net";
  version = "1.1.0";

  src = lib.cleanSource ../../../packages/Yasunori.NET;

  projectFile = "Yasunori.sln";
  nugetDeps = ./deps.nix;

  dotnet-sdk = dotnetCorePackages.sdk_10_0;
  dotnet-runtime = dotnetCorePackages.runtime_10_0;

  # raise data race
  # System.IO.IOException: The process cannot access the file '/build/source/lib/bin/Release/net8.0/Yasunori.Net.deps.json' because it is being used by another process. [/build/source/lib/Yasunori.Net.csproj]
  enableParallelBuilding = false;

  executables = [ "Yasunori" ];

  doCheck = true;

  meta = {
    mainProgram = "Yasunori";
  };
}
