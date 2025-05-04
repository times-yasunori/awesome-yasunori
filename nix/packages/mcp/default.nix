{
  stdenv,
  lib,
  pnpm,
  nodejs,
  nix-gitignore,
}:
let
  baseDir = ../../../.;
  packageJson = builtins.fromJSON (builtins.readFile (baseDir + "/packages/mcp/package.json"));
in
stdenv.mkDerivation (finalAttrs: {
  pname = "yasunori-${packageJson.name}";
  version = packageJson.version;
  src = nix-gitignore.gitignoreSource [
    "*"
    "!yasunori.toml"
    "!pnpm-lock.yaml"
    "!pnpm-workspace.yaml"
    "!packages"
    "!packages/api"
    "!packages/api/**"
    "!packages/api/script/**"
    "!packages/api/src/**"
    "packages/api/src/awesome-yasunori.json"
    "!packages/mcp"
    "!packages/mcp/**"
    "!packages/mcp/src/**"
    "!.npmrc"
  ] (lib.cleanSource baseDir);
  nativeBuildInputs = [
    pnpm.configHook
    nodejs
  ];
  pnpmWorkspaces = [
    "mcp"
    "api"
  ];
  buildInputs = [ nodejs ];
  prePnpmInstall = ''
    pnpm config set dedupe-peer-dependents false
  '';
  pnpmDeps = pnpm.fetchDeps {
    inherit (finalAttrs)
      pname
      version
      src
      pnpmWorkspaces
      prePnpmInstall
      ;
    hash = "sha256-UW/9RKamXhdKnzlwUsdKfSu2+2U01uI18tgqAAxBbXk=";
  };
  patchPhase = ''
    sed -i "/use-node-version/d" .npmrc
  '';
  buildPhase = ''
    runHook preBuild
    pushd packages/api/
    touch ./src/awesome-yasunori.json && node ./script/generate-awesome-yasunori-json.js
    popd
    pnpm --filter=api build
    pnpm --filter=mcp build

    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    mkdir -p $out/{packages/mcp,packages/api,bin}
    cp -r node_modules $out
    cp -r packages/api/{node_modules,dist} $out/packages/api
    cp -r packages/mcp/{node_modules,dist} $out/packages/mcp
    ln -s $out/packages/mcp/dist/index.mjs $out/bin/yasunori-mcp
    runHook postInstall
  '';

  meta = {
    description = packageJson.description;
    license = lib.licenses.isc;
    mainProgram = "yasunori-mcp";
  };
})
