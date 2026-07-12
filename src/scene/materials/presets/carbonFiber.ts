// src/scene/materials/presets/carbonFiber.ts
import * as THREE from 'three';

interface CarbonTextures {
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
}

export const applyCarbonFiber = (
  material: THREE.MeshPhysicalMaterial,
  textures: CarbonTextures
): void => {
  material.color.setHex(0x1a1a1a);
  material.normalMap = textures.normalMap;
  material.roughnessMap = textures.roughnessMap;
  material.roughness = 1.0; 
  material.metalness = 0.0;
  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.05;
  material.needsUpdate = true;
};

export const applyBlackPlastic = (material: THREE.MeshPhysicalMaterial): void => {
  material.color.setHex(0x222222);
  material.normalMap = null;
  material.roughnessMap = null;
  material.roughness = 0.85;
  material.clearcoat = 0.0;
  material.clearcoatRoughness = 0.0;
  material.needsUpdate = true;
};