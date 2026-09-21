import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const srcDir = join(root, "site");
const docsDir = join(root, "docs");

console.log("Generating GitHub Pages static export in /docs...");

if (!existsSync(docsDir)) {
  mkdirSync(docsDir, { recursive: true });
}

// Copy static site files to docs
cpSync(srcDir, docsDir, { recursive: true });

// Create .nojekyll in both docs and site
writeFileSync(join(docsDir, ".nojekyll"), "");
writeFileSync(join(srcDir, ".nojekyll"), "");

console.log("✓ GitHub Pages files ready in /docs");
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

