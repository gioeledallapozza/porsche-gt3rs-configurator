import fs from 'fs';
import path from 'path';

const root = process.cwd();
const generatedFile = path.join(root, 'Scene-opt.tsx');
const targetPath = path.join(root, 'src', 'scene', 'vehicle', 'models', 'Gt3rsModel.tsx');

if (!fs.existsSync(generatedFile)) {
    console.error(`Error: Generated file not found at ${generatedFile}`);
    process.exit(1);
}

const dir = path.dirname(targetPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

let content = fs.readFileSync(generatedFile, 'utf8');

// --- 1. CLEAN IMPORTS ---
// Remove React, keep JSX
content = content.replace(/import React from 'react'[\r\n]*/, '');
// Ensure JSX import exists
if (!content.includes("import type { JSX } from 'react'")) {
    content = content.replace(
        "import { useGLTF } from '@react-three/drei'", 
        "import { useGLTF } from '@react-three/drei'\nimport type { JSX } from 'react'"
    );
}
// Ensure GLTF is type imported
content = content.replace("import { GLTF } from 'three-stdlib'", "import type { GLTF } from 'three-stdlib'");

// --- 2. RENAME COMPONENT AND ADD DYNAMIC PROP ---
content = content.replace(
  /export function Model\(props: JSX\.IntrinsicElements\['group'\]\) \{/,
  "export default function Gt3rsModel({ url, ...props }: JSX.IntrinsicElements['group'] & { url: string }) {"
);

// --- 3. REPLACE HARDCODED PATH WITH DYNAMIC URL ---
content = content.replace(
  /const { nodes, materials } = useGLTF\(['"`].*?['"`]\)/,
  'const { nodes, materials } = useGLTF(url) as unknown as GLTFResult'
);

// --- 4. FIX PRELOAD STATIC PATH ---
content = content.replace(
  /useGLTF\.preload\(['"`].*?['"`]\)/,
  "useGLTF.preload('/models/gt3rs/scene-opt.glb')"
);

// --- 5. CLEANUP ---
content = content.replace(/\s+animations: GLTFAction\[\]/, '');

// Write file and clean up
fs.writeFileSync(targetPath, content);
fs.unlinkSync(generatedFile);

console.log('✅ Gt3rsModel patched and moved successfully!');