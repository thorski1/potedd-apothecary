const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const webp = require('webp-converter');

const publicDir = path.join(__dirname, '..', 'public');

function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const newPath = filePath.replace(ext, '.webp');

  if (ext === '.svg') {
    console.log(`Skipping SVG file: ${filePath}`);
    return;
  }

  sharp(filePath)
    .webp({ quality: 80 })
    .toFile(newPath)
    .then(() => {
      console.log(`Optimized: ${filePath} -> ${newPath}`);
      if (ext !== '.webp') {
        fs.unlinkSync(filePath);
      }
    })
    .catch(err => console.error(`Error optimizing ${filePath}:`, err));
}

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      traverseDirectory(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        optimizeImage(filePath);
      }
    }
  });
}

traverseDirectory(publicDir);