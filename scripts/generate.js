const fs = require("fs");
const path = require("path");
const { transform } = require("@svgr/core");

const svgDir = "./svg/solid";
const outputDir = "./src/components"; // You can change this to wherever you want to output your React components

// Remove the existing output directory if it exists
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true });
}

// Create the output directory
fs.mkdirSync(outputDir, { recursive: true });

// Read all SVG files in the directory
fs.readdir(svgDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // Process each SVG file
  files.forEach((file) => {
    if (path.extname(file) === ".svg") {
      const svgFilePath = path.join(svgDir, file);
      const iconName = path.basename(file, ".svg");

      // Convert camelCase SVG file names to PascalCase for React component names
      const componentName = iconName.replace(
        /(^|-)([a-z])/g,
        (match, _, char) => char.toUpperCase(),
      );

      // Read the SVG file
      fs.readFile(svgFilePath, "utf8", (err, svgCode) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        // Transform SVG content to React component code using svgr
        transform(
          svgCode,
          {
            plugins: [
              // "@svgr/plugin-svgo",
              "@svgr/plugin-jsx",
              "@svgr/plugin-prettier",
            ],
            icon: true,
            typescript: true,
          },
          { componentName },
        )
          .then((reactCode) => {
            // Write the React component to a file
            const outputFilePath = path.join(outputDir, componentName + ".tsx");
            fs.writeFile(outputFilePath, reactCode, (err) => {
              if (err) {
                console.error("Error writing file:", err);
              } else {
                console.log(`Converted ${file} to ${componentName}.js`);
              }
            });
          })
          .catch((err) => {
            console.error("Error converting SVG to React component:", err);
          });
      });
    }
  });
});
