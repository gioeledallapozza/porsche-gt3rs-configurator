import { useLevaStore } from '@/store/levaStore';
import * as THREE from 'three';

interface CarbonTextures {
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
}

export const applyCarbonFiber = (
  material: THREE.MeshPhysicalMaterial,
  textures: CarbonTextures
): void => {
  const tweaks = useLevaStore.getState().carbonTwill;

  material.color.setHex(0x050505);

  material.normalMap = textures.normalMap;
  material.normalScale.set(tweaks.normalScale, tweaks.normalScale);
  
  material.roughnessMap = textures.roughnessMap;
  material.roughness = tweaks.roughness;
  material.metalness = tweaks.metalness;

  material.clearcoat = tweaks.clearcoat;
  material.clearcoatRoughness = tweaks.clearcoatRoughness;
  
  material.clearcoatNormalMap = null; //WE NEED TO ADD A MAP TO LOWER THE NORMAL SCALE WHILE KEEPING THE CLEARCOAT ELEVATED
  material.clearcoatNormalScale.set(1, 1);

  material.sheen = 0.0;
  material.iridescence = 0.0;

  material.onBeforeCompile = () => {};
  material.customProgramCacheKey = () => 'carbon_twill';

  material.needsUpdate = true;
};

export const applyForgedCarbon = (
  material: THREE.MeshPhysicalMaterial, 
  textures: CarbonTextures
): void => {
  const tweaks = useLevaStore.getState().carbonForged;

  material.color.setHex(0x050505); 

  material.normalMap = textures.normalMap;
  material.normalScale.set(Math.max(0.2, tweaks.normalScale * 1.8), Math.max(0.2, tweaks.normalScale * 1.8)); 
  
  material.roughnessMap = textures.roughnessMap;
  material.roughness = tweaks.roughness; 
  
  material.metalness = tweaks.metalness; 

  material.clearcoat = tweaks.clearcoat;
  material.clearcoatRoughness = tweaks.clearcoatRoughness;
  
  material.clearcoatNormalMap = null;
  material.clearcoatNormalScale.set(1, 1);
  
  material.sheen = 0.0;
  material.iridescence = 0.0;

  material.onBeforeCompile = () => {};
  material.customProgramCacheKey = () => 'carbon_forged';

  material.needsUpdate = true;
};

