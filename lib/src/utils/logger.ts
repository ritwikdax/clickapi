import chalk from "chalk";
import ora, { Ora } from "ora";

class Logger {
  //   private static timestamp(): string {
  //     return chalk.gray(`[${new Date().toLocaleTimeString()}]`);
  //   }

  static info(message: string): void {
    console.log(`${chalk.blue("ℹ️ INFO")} ${chalk.blueBright(message)}`);
  }

  static warn(message: string): void {
    console.log(`${chalk.yellow("⚠️ WARN")} ${chalk.yellowBright(message)}`);
  }

  static error(message: string): void {
    console.log(`${chalk.red("❌ ERROR")} ${chalk.redBright(message)}`);
  }

  static debug(message: string): void {
    console.log(`${chalk.magenta("🐞 DEBUG")} ${chalk.magentaBright(message)}`);
  }

  static success(message: string): void {
    console.log(`${chalk.green("✅ SUCCESS")} ${chalk.greenBright(message)}`);
  }

  static fatal(message: string): void {
    console.log(
      `${chalk.bgRed.white.bold("💀 FATAL")} ${chalk.redBright.bold(message)}`
    );
  }

  static async runSteps(
    steps: { label: string; task: () => Promise<void> }[],
    delayMs: number = 300
  ): Promise<void> {
    for (const { label, task } of steps) {
      const spinner: Ora = ora({ text: label, spinner: "dots" }).start();
      try {
        await task();
        await new Promise((res) => setTimeout(res, delayMs));
        spinner.succeed(chalk.greenBright(`✅ ${label}`));
      } catch (err: any) {
        spinner.fail(chalk.redBright(`❌ ${label}`));
        this.error(err);
      }
    }
  }
}

export default Logger;
