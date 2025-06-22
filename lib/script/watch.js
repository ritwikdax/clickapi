const chokidar = require("chokidar");
const build = require("./build");
const path = require("path");

const parentDir = path.resolve(__dirname, "../src");
console.log(parentDir);
chokidar.watch(parentDir).on("change", (event, path) => {
  console.log(event, path);
  build.buildApp();
});
