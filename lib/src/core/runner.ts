import { listTestFiles, Loader, loadTestFile } from "./loader";
import { runTest } from "./engine";
import { Task, TestFile } from "../interfaces/interface";
import cfonts from "cfonts";
import chalk from "chalk";
import ora from "ora";
import Logger from "../utils/logger";
import { Context } from "./context";
import { ZodError } from "zod";
import { handleError } from "../utils/utils";
import { program } from "commander";

const filePath = process.argv[2];

export const click = async () => {
  program
    .name("click")
    .description("Declarative API Testing Made Easy!")
    .version("2.3.4");

  program.parse(process.argv);

  //ora("Running Test").start();
  // Logger.runSteps(
  //   [{ label: "Reading Configs!", task: () => loadConfig() }],
  //   3000
  // );

  //console.log("Loading Config");
  // const spinner = ora("Searching Configs, Loading...").start();
  // await new Promise((res) => setTimeout(res, 5000));
  // await Loader.loadConfig();
  // spinner.fail(`${chalk.green("Config loaded!")}`);

  await Runner.runTask([
    {
      name: "Load Config Files\n",
      successMessage: "Configs Loaded Successfully",
      failureMessage: "Failed to load config file",
      fn: () => Loader.loadConfig(),
    },
  ]);

  // if (!filePath) {
  //   console.error(
  //     chalk.bgCyan.red("❌ Please provide a test file path (YAML or JSON)")
  //   );
  //   process.exit(1);
  // }

  // try {
  //   listTestFiles(filePath);
  //   const file = loadTestFile(filePath) as TestFile;
  //   cfonts.say("Clicked!");
  //   await runTest(file);
  //   console.log("🎉 All steps passed.");
  // } catch (err: any) {
  //   console.error("❌ Test failed:", err.message);
  //   process.exit(1);
  // }
};

export class Runner {
  static async runTask(tasks: Task[]) {
    for (const task of tasks) {
      //Load tasks and execute
      const spinner = ora(`${task.name}`).start();
      try {
        await task.fn();
        spinner.succeed(`${chalk.bold.greenBright(task.successMessage)}`);
      } catch (err: any) {
        //Promise filed
        console.log(err);
        handleError(err);
        spinner.fail(`${chalk.bold.red(task.failureMessage)}`);
      }
    }
  }
}
