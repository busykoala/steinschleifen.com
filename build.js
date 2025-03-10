const nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const tailwindPath = path.join(__dirname, "node_modules/.bin/tailwindcss");

// Configure Nunjucks
nunjucks.configure("templates", { autoescape: true });

// Folders
const pagesDir = "./pages";
const assetsDir = "./assets";
const outputDir = "./docs";

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to copy static assets
function copyAssets() {
  if (fs.existsSync(assetsDir)) {
    fs.cpSync(assetsDir, path.join(outputDir, "assets"), { recursive: true });
    console.log("📂 Assets copied!");
  } else {
    console.log("⚠️ No assets directory found, skipping...");
  }
}

// Function to render a page
function renderPage(file) {
  const filePath = path.join(pagesDir, file);
  const outputFilePath = path.join(outputDir, file.replace(".njk", ".html"));

  const content = fs.readFileSync(filePath, "utf8");
  const rendered = nunjucks.renderString(content);

  fs.writeFileSync(outputFilePath, rendered);
}

// Process all `.njk` files in `pages`
fs.readdirSync(pagesDir).forEach(file => {
  if (file.endsWith(".njk")) {
    renderPage(file);
  }
});

// Process Tailwind CSS
copyAssets();

// Process Tailwind CSS AFTER rendering pages
console.log("🎨 Processing Tailwind CSS...");

try {
  execSync(`npx tailwindcss -i ./assets/style.css -o ./docs/assets/style.css --minify`, {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" }
  });
  console.log("✅ Tailwind CSS built successfully!");
} catch (error) {
  console.error("❌ Tailwind CSS build failed:", error);
  process.exit(1);
}

console.log("✅ Static site generated in 'docs/'!");


console.log("✅ Static site generated in 'docs/'!");
