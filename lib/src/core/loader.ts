import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { cosmiconfig } from "cosmiconfig";

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

export async function loadConfig() {
  console.log("🔍 Current working directory:", process.cwd());
  const moduleName = "click"; // config file name: yourcli.config.js / .yourclirc / yourcli.yaml

  const explorer = cosmiconfig(moduleName, {
    searchPlaces: [
      "package.json", // supports a "yourcli" key
      `.${moduleName}rc`,
      `.${moduleName}rc.json`,
      `.${moduleName}rc.yaml`,
      `.${moduleName}rc.yml`,
      `.${moduleName}rc.js`,
      `${moduleName}.config.js`,
      `${moduleName}.config.json`,
      `${moduleName}.config.yaml`,
    ],
  });

  try {
    const result = await explorer.search();

    if (!result) {
      console.error("❌ Config not found");
      process.exit(1);
    }

    console.log("✅ Config loaded from:", result.filepath);
    console.log(result);
  } catch (err) {
    console.error("❌ Failed to load config", err);
    process.exit(1);
  }
}
