// generate stub index.html files for dev entry
import { execSync } from "child_process";
import fs from "fs-extra";
import chokidar from "chokidar";
import { r, port, isDev, log } from "./utils";

/**
 * Stub index.html to use Vite in development
 */
async function stubIndexHtml() {
  const view = 'webAccessibleResource'
  await fs.ensureDir(r(`extension/dist/${view}`));
  let data = await fs.readFile(r(`src/index.html`), "utf-8");
  data = data
    .replace('"./main.jsx"', `"http://localhost:${port}/main.jsx"`)
    .replace(
      '<div id="app"></div>',
      '<div id="app">Vite server did not start</div>'
    );
    await fs.writeFile(r(`extension/dist/${view}/index.html`), data, "utf-8");
    console.log("PRE", `stub ${view}`);
}

function writeManifest() {
  execSync("npx tsx ./scripts/manifest.js", { stdio: "inherit" });
}

writeManifest();

if (isDev) {
  stubIndexHtml();
  chokidar.watch(r("src/**/*.html")).on("change", () => {
    stubIndexHtml();
  });
  chokidar.watch([r("src/manifest.js"), r("package.json")]).on("change", () => {
    writeManifest();
  });
}
