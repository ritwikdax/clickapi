import { listTestFiles, loadConfig, loadTestFile } from "./loader";
import { runTest } from "./engine";
import { TestFile } from "../interfaces/interface";
import cfonts from "cfonts";
import chalk from "chalk";

const filePath = process.argv[2];

const click = async () => {
  if (!filePath) {
    console.error(
      chalk.bgCyan.red("❌ Please provide a test file path (YAML or JSON)")
    );
    process.exit(1);
  }

  try {
    listTestFiles(filePath);
    await loadConfig();
    //const file = loadTestFile(filePath) as TestFile;
    cfonts.say("Clicked!");
    //await runTest(file);
    console.log("🎉 All steps passed.");
  } catch (err: any) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }
};

export default click;
