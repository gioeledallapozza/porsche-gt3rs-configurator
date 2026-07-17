import * as THREE from 'three';

// 1. CABIN GLASS
export const configureCabinGlass = (material: THREE.MeshPhysicalMaterial): void => {
  material.color.setHex(0x555555);
  material.transmission = 1.0; 
  material.opacity = 1.0;  

  material.metalness = 0.0; 
  material.roughness = 0.0; 
  material.thickness = 0.05;
  
  material.clearcoat = 0.0;
  material.clearcoatRoughness = 0.0;
  console.log(material.envMap)


  material.envMapIntensity = 0.0; //DOESN'T WORk


  material.transparent = true;
  material.depthWrite = true; 
  material.needsUpdate = true;
};

// 2. OPTICAL LIGHTS GLASS (Headlights & Taillights)
// Uses Physical Transmission: Perfect optical clarity, bends light inside the headlight housing.
export const configureLightsGlass = (material: THREE.MeshPhysicalMaterial): void => {
  material.color.setHex(0xffffff);
  material.transmission = 1.0;     
  material.opacity = 1.0; 
  
  material.ior = 1.0; 
  material.thickness = 0.1; 
  
  material.metalness = 0.0; 
  material.roughness = 0.0; 
  
  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.0;
  
  material.transparent = true;
  material.depthWrite = false;
  material.needsUpdate = true;
};