import Ajv from "ajv";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { baseConfig } from "./base/index.ts";
import { nodeConfig } from "./node/index.ts";
import { reactConfig } from "./react/index.ts";

const schema = JSON.parse(
  readFileSync("./node_modules/oxlint/configuration_schema.json", "utf-8"),
);

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

function validateAndWrite(config: unknown, name: string) {
  if (!validate(config)) {
    console.error(`Validation failed for ${name}:`, validate.errors);
    process.exit(1);
  }
  writeFileSync(`dist/${name}.json`, JSON.stringify(config, null, 2));
  console.info(`dist/${name}.json`);
}

mkdirSync("dist", { recursive: true });

validateAndWrite(baseConfig, "base");
validateAndWrite(reactConfig, "react");
validateAndWrite(nodeConfig, "node");
