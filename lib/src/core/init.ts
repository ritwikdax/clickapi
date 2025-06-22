import fs from "fs";
import path from "path";
import { stringify } from "yaml";
import { defaultConfig } from "./const/config.const";

const CONFIG_FILENAME = "click.config.yaml";

export function runInitCommand() {
  const configPath = path.resolve(process.cwd(), CONFIG_FILENAME);

  if (fs.existsSync(configPath)) {
    console.error(`❌ Config already exists at ${configPath}`);
    process.exit(1);
  }

  const yamlContent = stringify(defaultConfig);

  fs.writeFileSync(configPath, yamlContent, "utf-8");
  console.log(`✅ Created config file at ${configPath}`);
}
