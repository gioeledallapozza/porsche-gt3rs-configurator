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
  "const { nodes, materials } = useGLTF(url, '/draco/') as unknown as GLTFResult"
);

// --- 4. FIX PRELOAD STATIC PATH ---
content = content.replace(
  /useGLTF\.preload\(['"`].*?['"`]\)/,
  "useGLTF.preload('/models/gt3rs/scene-opt.glb', '/draco/')"
);

// --- 5. CLEANUP ---
content = content.replace(/\s+animations: GLTFAction\[\]/, '');


// --- 6. INJECT SHADOW INHERITANCE LOGIC ---
const shadowHelper = `
// Function dynamically injected by patch-model.js
const getInheritedShadow = (gltfNode: any, property: 'castShadow' | 'receiveShadow'): boolean => {
  if (!gltfNode) return false;
  if (gltfNode.userData[property] !== undefined) {
    return gltfNode.userData[property] === 1 || gltfNode.userData[property] === true;
  }
  if (gltfNode.parent) {
    return getInheritedShadow(gltfNode.parent, property);
  }
  return false;
};
`;

// Add the helper before the component declaration
content = content.replace(
  "export default function Gt3rsModel", 
  shadowHelper + "\nexport default function Gt3rsModel"
);

// Locate all the meshes and inject the props evaluated at runtime into the nodes
content = content.replace(
  /<mesh([^>]*)geometry=\{nodes\.([\w-]+)\.geometry\}([^>]*?)\/?>/g,
  "<mesh$1geometry={nodes.$2.geometry}$3 castShadow={getInheritedShadow(nodes.$2, 'castShadow')} receiveShadow={getInheritedShadow(nodes.$2, 'receiveShadow')} />"
);

// Write file and clean up
fs.writeFileSync(targetPath, content);
fs.unlinkSync(generatedFile);

console.log('✅ Gt3rsModel patched and moved successfully!');