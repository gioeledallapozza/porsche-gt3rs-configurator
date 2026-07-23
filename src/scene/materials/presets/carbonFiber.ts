import { useLevaStore } from '@/store/levaStore';
import * as THREE from 'three';

interface CarbonTextures {
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
}

//FALT NORMAL MAP 
const flatNormalData = new Uint8Array([128, 128, 255, 255]);
const flatNormalMap = new THREE.DataTexture(flatNormalData, 1, 1, THREE.RGBAFormat);
flatNormalMap.needsUpdate = true;

export const applyCarbonFiber = (
  material: THREE.MeshPhysicalMaterial,
  textures: CarbonTextures
): void => {
  const tweaks = useLevaStore.getState().carbonTwill;

  material.color.set(tweaks.color);

  material.normalMap = textures.normalMap;
  material.normalScale.set(tweaks.normalScale, tweaks.normalScale);
  
  material.roughnessMap = textures.roughnessMap;
  material.roughness = tweaks.roughness;
  material.metalness = tweaks.metalness;

  material.clearcoat = tweaks.clearcoat;
  material.clearcoatRoughness = tweaks.clearcoatRoughness;

  material.envMapIntensity = tweaks.envMapIntensity;
  
  material.clearcoatNormalMap = flatNormalMap;
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

  material.color.set(tweaks.color);; 

  material.normalMap = textures.normalMap;
  material.normalScale.set(Math.max(0.2, tweaks.normalScale * 1.8), Math.max(0.2, tweaks.normalScale * 1.8)); 
  
  material.roughnessMap = textures.roughnessMap;
  material.roughness = tweaks.roughness; 
  
  material.metalness = tweaks.metalness; 

  material.clearcoat = tweaks.clearcoat;
  material.clearcoatRoughness = tweaks.clearcoatRoughness;

  material.envMapIntensity = tweaks.envMapIntensity;
  
  material.clearcoatNormalMap = flatNormalMap;
  material.clearcoatNormalScale.set(1, 1);
  
  material.sheen = 0.0;
  material.iridescence = 0.0;

  material.onBeforeCompile = () => {};
  material.customProgramCacheKey = () => 'carbon_forged';

  material.needsUpdate = true;
};

