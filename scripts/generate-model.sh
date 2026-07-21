#!/bin/bash

set -e

echo "1. Optimizing textures to WebP..."
npx @gltf-transform/cli webp public/models/gt3rs/scene.glb public/models/gt3rs/temp.glb --quality 80

echo "2. Compressing geometry with Draco..."
npx @gltf-transform/cli draco public/models/gt3rs/temp.glb public/models/gt3rs/scene-opt.glb

echo "3. Removing temporary files..."
rm public/models/gt3rs/temp.glb

echo "4. Generating React component via gltfjsx..."
npx gltfjsx public/models/gt3rs/scene-opt.glb --shadows --types --keepgroups --keepnames

echo "5. Executing post-processing script..."
node scripts/patch-model.js

echo "Pipeline completed successfully. The model is ready."