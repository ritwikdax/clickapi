import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { cosmiconfig } from "cosmiconfig";
import { Context } from "./context";
import { SchemaValidator } from "../validators/validator";
import { configSchema } from "../validators/schema/config.schema";

export function loadTestFile(filePath: string): any {
  const content = fs.readFileSync(filePath, "utf-8");
  return filePath.endsWith(".yaml") || filePath.endsWith(".yml")
    ? yaml.load(content)
    : JSON.parse(content);
}

export function listTestFiles(folderPath: string) {
  // Directory you want to read
  const targetDir = path.resolve(folderPath);

  if (!fs.existsSync(targetDir)) {
    console.error("❌ Directory not found:", targetDir);
    process.exit(1);
  }

  // Read yaml files from directory
  const files = fs.readdirSync(targetDir).filter((f) => f.endsWith(".yaml"));

  if (files.length === 0) {
    console.log("📂 No files found in", targetDir);
    process.exit(0);
  }

  console.log(`📄 Found ${files.length} file(s):\n`);

  // Loop through each file
  for (const file of files) {
    const fullPath = path.join(targetDir, file);

    console.log("🤯");
    console.log(file);
    // Ensure it's a file (not a folder)
    // if (fs.statSync(fullPath).isFile()) {
    //   const content = fs.readFileSync(fullPath, "utf-8");
    //   console.log(`🧾 ${file}:\n${content}\n---\n`);
    // }
  }
}

export class Loader {
  static async loadConfig() {
    const context = Context.getInstance();

    const moduleName = "click"; // Change this to your CLI/tool name
    const explorer = cosmiconfig(moduleName, {
      searchPlaces: ["click.config.yaml"],
    });
    const result = await explorer.search();
    console.log(result?.config);

    const schema = new SchemaValidator(configSchema);
    const refinedConfig = schema.validate(result?.config);
    console.log(context);
    context.setConfig("baseConfig", refinedConfig);
    console.log(context.get("config.baseConfig"));
  }
}
