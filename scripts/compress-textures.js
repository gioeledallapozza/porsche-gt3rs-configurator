import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_DIR = path.resolve(__dirname, '../_raw_assets/textures/flakes'); //to change for other textures
const OUT_DIR = path.resolve(__dirname, '../public/textures/materials/flakes'); //to change for other textures

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Recursion
const files = fs.readdirSync(RAW_DIR, { recursive: true });

files.forEach(file => {
  // Ignore folders
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    
    // build paths
    const outFile = path.join(OUT_DIR, `${baseName}.ktx2`);
    const inFile = path.join(RAW_DIR, file);

    console.log(`Compressione: ${baseName}${ext} ...`);
    
   try {
      if (file.includes('normal')) {
        //--assign_oetf linear FORCE the space color for data
        execSync(`toktx --t2 --assign_oetf linear --encode uastc --uastc_quality 4 --zcmp 22 --normal_mode "${outFile}" "${inFile}"`);
      } else if (file.includes('roughness') || file.includes('metalness')) {
        // --assign_oetf linear FORCE the space color for data
        execSync(`toktx --t2 --assign_oetf linear --encode etc1s --clevel 5 "${outFile}" "${inFile}"`);
      } else {
        // Albedo reamins sRGB
        execSync(`toktx --t2 --encode etc1s --clevel 5 "${outFile}" "${inFile}"`);
      }
    } catch (error) {
      console.error(`Error during compression of ${baseName}${ext}: ${error.message}`);
    }
  } 
});

console.log('--- All textures have been successfully compressed! ---');