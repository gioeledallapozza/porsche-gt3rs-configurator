import * as THREE from 'three';

interface CarbonTextures {
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
}

export const applyCarbonFiber = (
  material: THREE.MeshPhysicalMaterial,
  textures: CarbonTextures
): void => {
  material.color.setHex(0x050505);

  material.normalMap = textures.normalMap;
  material.normalScale.set(0.3, 0.3);
  
  material.roughnessMap = textures.roughnessMap;
  material.roughness = 1.0; 
  material.metalness = 0.6; 

  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.0; 
  // material.ior = 1.5;
  
  material.clearcoatNormalMap = null; 
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

  material.color.setHex(0x050505); 

  material.normalMap = textures.normalMap;
  material.normalScale.set(0.6, 0.6); 
  
  material.roughnessMap = textures.roughnessMap;
  material.roughness = 1.0; 
  
  material.metalness = 0.6; 

  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.0;
  
  material.clearcoatNormalMap = null;
  material.clearcoatNormalScale.set(1, 1);
  
  // material.ior = 1.5;
  material.sheen = 0.0;
  material.iridescence = 0.0;

  material.onBeforeCompile = () => {};
  material.customProgramCacheKey = () => 'carbon_forged';

  material.needsUpdate = true;
};

