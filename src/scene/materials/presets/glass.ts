import * as THREE from 'three';

// CABIN GLASS
// No trasmission for WebGL limitation. Because behind the window there is no opaque object
// it fallbacks to env map and return a white color (the CSS background is grey)
export const configureCabinGlass = (material: THREE.MeshPhysicalMaterial): void => {
  material.transmission = 0.0; 
  
  material.transparent = true; 
  material.opacity = 0.9; //Adjust for darken/lighter windows
  material.color.setHex(0x000000); 
  
  material.depthWrite = true; //It hides the render of the glass behind another glass but looks natural 

  material.roughness = 0.0; 
  material.metalness = 0.1;

  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.0;
  material.envMapIntensity = 1.5;

  material.side = THREE.DoubleSide; 
  
  material.needsUpdate = true;
};

// 2. OPTICAL LIGHTS GLASS (Headlights & Taillights)
// Uses Physical Transmission: Perfect optical clarity, bends light inside the headlight housing.
export const configureLightsGlass = (material: THREE.MeshPhysicalMaterial): void => {
  material.color.setHex(0xffffff);
  material.transmission = 1.0;     
  material.opacity = 1.0; 
  
  material.ior = 1.58;
  material.thickness = 0.05;
  
  material.metalness = 0.0; 
  material.roughness = 0.0; 
  
  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.0;
  material.envMapIntensity = 1.0;
  
  material.transparent = true;
  material.depthWrite = false;
  material.needsUpdate = true;
};