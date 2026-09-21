import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const srcDir = join(root, "site");
const docsDir = join(root, "docs");

console.log("Generating GitHub Pages static export in /docs...");

if (!existsSync(docsDir)) {
  mkdirSync(docsDir, { recursive: true });
}

// Copy static site files to docs and root
cpSync(srcDir, docsDir, { recursive: true });
for (const file of ["index.html", "styles.css", "app.js", "favicon.svg", "mascot.png", "og.jpg", ".nojekyll"]) {
  if (existsSync(join(srcDir, file))) {
    cpSync(join(srcDir, file), join(root, file));
  }
}
cpSync(join(srcDir, "episodes"), join(root, "episodes"), { recursive: true });
if (existsSync(join(root, "CNAME"))) {
  cpSync(join(root, "CNAME"), join(docsDir, "CNAME"));
}

// Create .nojekyll
writeFileSync(join(docsDir, ".nojekyll"), "");
writeFileSync(join(srcDir, ".nojekyll"), "");
writeFileSync(join(root, ".nojekyll"), "");

console.log("✓ GitHub Pages files ready in / and /docs");
console.log("✓ .nojekyll created");

// Package into github-pages-site.zip
try {
  import("node:child_process").then(({ execSync }) => {
    execSync("tar -a -c -f github-pages-site.zip -C docs .", { stdio: "inherit" });
    console.log("✓ Created github-pages-site.zip");
  });
} catch (e) {
  console.warn("Could not create zip archive automatically:", e.message);
}

