import * as THREE from 'three';
import { useLevaStore } from '@/store/levaStore';

// interface LeatherTextures {
//   normalMap: THREE.Texture | null;
//   // armMap: THREE.Texture | null;
// }

export const applyLeather = (
  material: THREE.MeshPhysicalMaterial,
  hexColor: string
): void => {
  const tweaks = useLevaStore.getState().leather;

  material.color.set(hexColor);

  // material.map = null; 
  // material.vertexColors = false;

  // material.normalMap = textures.normalMap;
  material.normalScale.set(1.0, 1.0);

  // material.aoMap = textures.armMap;
  // material.aoMapIntensity = 0.8;

  material.roughness = tweaks.roughness;
  // material.roughnessMap = textures.armMap;

  material.roughnessMap = null;
  material.aoMap = null;
  material.metalnessMap = null;

  // material.metalnessMap = textures.armMap;
  // material.metalness = tweaks.metalness;

  material.clearcoat = tweaks.clearcoat;
  material.clearcoatRoughness = 0.0;

  material.sheen = tweaks.sheen;
  material.sheenRoughness = tweaks.sheenRoughness;
  material.sheenColor.setHex(0xffffff);

  material.envMapIntensity = tweaks.envMapIntensity;

  material.needsUpdate = true;
};


export const applyStitching = (
  material: THREE.MeshPhysicalMaterial, 
  hexColor: string
): void => {
  material.color.set(hexColor);
  
  material.roughness = 0.9;
  material.metalness = 0.0;
  material.clearcoat = 0.0;
  material.sheen = 0.1; // Filo leggermente riflettente ai bordi

  material.needsUpdate = true;
};