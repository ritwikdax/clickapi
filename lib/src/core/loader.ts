import fs from "fs";
import yaml from "js-yaml";

export function loadTestFile(filePath: string): any {
  const content = fs.readFileSync(filePath, "utf-8");
  return filePath.endsWith(".yaml") || filePath.endsWith(".yml")
    ? yaml.load(content)
    : JSON.parse(content);
}
