const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'generated', 'prisma');
const destDir = path.join(__dirname, '..', 'dist', 'generated', 'prisma');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source directory not found: ${src}`);
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const name of fs.readdirSync(src)) {
    const srcPath = path.join(src, name);
    const destPath = path.join(dest, name);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(srcDir, destDir);
console.log(`Copied generated Prisma assets from ${srcDir} to ${destDir}`);
