const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/Jitu/.gemini/antigravity-ide/brain/956dc574-6bef-4014-8a97-64a698c1f78c/';
const dstDir = path.join(__dirname, 'public');

const files = [
  ['iphone_15_pro_max_1780122929497.png', 'iphone-15-pro-max.png'],
  ['sony_a7_iv_1780122949661.png', 'sony-a7-iv.png'],
  ['mavic_3_cine_1780122967148.png', 'mavic-3-cine.png'],
  ['dji_mic_2_1780122985613.png', 'dji-mic-2.png'],
];

files.forEach(([src, dst]) => {
  const srcPath = path.join(srcDir, src);
  const dstPath = path.join(dstDir, dst);
  fs.copyFileSync(srcPath, dstPath);
  console.log(`Copied: ${dst}`);
});

console.log('All images copied successfully!');
