import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import jsonfile from "jsonfile";
import toml from "toml";

const yasunoriTomlPath = resolve("../../yasunori.toml");
const yasunoriToml = readFileSync(yasunoriTomlPath, { encoding: "utf8" });
const yasunoriJsonPath = resolve("./src/awesome-yasunori.json");

function generateAwesonYasunoriJson() {
  try {
    const parsedYasunoriToml = toml.parse(yasunoriToml);
    jsonfile.writeFileSync(yasunoriJsonPath, parsedYasunoriToml);
    console.log("Successfull to generate awesome-yasunori.json");
  } catch (e) {
    console.log(`Failed to generate awesome-yasunori.json: ${e}`);
  }
}

generateAwesonYasunoriJson();
