const { build } = require("esbuild");

module.exports.buildApp = function () {
  build({
    entryPoints: ["src/cli.ts"],
    bundle: true,
    platform: "node",
    bundle: true,
    format: "cjs",
    target: ["node18"], // or whichever version you prefer
    outfile: "dist/cli.js",
  }).then(() => {
    console.log("Build Successful! 🎉");
  });
};
