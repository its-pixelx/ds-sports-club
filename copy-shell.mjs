import fs from "node:fs";
import path from "node:path";

const shellPath = path.resolve(".output/public/_shell.html");
const indexPath = path.resolve(".output/public/index.html");
const notFoundPath = path.resolve(".output/public/404.html");
const noJekyllPath = path.resolve(".output/public/.nojekyll");

if (fs.existsSync(shellPath)) {
  fs.copyFileSync(shellPath, indexPath);
  fs.copyFileSync(shellPath, notFoundPath);
  fs.writeFileSync(noJekyllPath, "");
  console.log("Successfully generated index.html, 404.html, and .nojekyll from _shell.html for static GitHub Pages hosting.");
} else {
  console.warn("_shell.html was not found in .output/public.");
}
