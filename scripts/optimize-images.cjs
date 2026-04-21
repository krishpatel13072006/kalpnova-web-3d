const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, '../public/projects'),
  path.join(__dirname, '../public/clients'),
  path.join(__dirname, '../public/team'),
];

async function optimizeImages(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await optimizeImages(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const outputFilePath = filePath.replace(ext, '.webp');

        // Skip if WebP already exists and is newer
        if (fs.existsSync(outputFilePath)) {
          continue;
        }

        console.log(`Optimizing: ${filePath} -> ${outputFilePath}`);
        try {
          await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(outputFilePath);
        } catch (err) {
          console.error(`Error optimizing ${file}:`, err);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting image optimization...');
  for (const dir of targetDirs) {
    await optimizeImages(dir);
  }
  console.log('Image optimization complete.');
}

run();
