import * as THREE from 'three';
// import { useLevaStore } from '@/store/levaStore';

interface AluminumTextures {
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
}

export const applyAluminum = (
  material: THREE.MeshPhysicalMaterial,
  textures: AluminumTextures
): void => {
  material.color.setHex(0xd4d4d4);

  material.normalMap = textures.normalMap;
  material.normalScale.set(0.5, 0.5);
  
  material.roughnessMap = textures.roughnessMap;

  material.roughness = 1.0; 
  
  material.metalness = 1.0; // Metall
  
  material.clearcoat = 0.0;
  material.clearcoatNormalMap = null;
  
  material.needsUpdate = true;
};
