#!/usr/bin/env node
import { click, runInitCommand } from "@core";
import { Command } from "commander";
import pkg from "../package.json";

// console.log("CLI Is Running 😍");
// click();

const program = new Command();
program
  .name("click")
  .description("Testing API Made Easy!")
  .version(pkg.version, "-v, --version", "display app version")
  .action(() => {
    click();
  });

program.command("init").action(() => {
  runInitCommand();
});

program.parse(process.argv);
