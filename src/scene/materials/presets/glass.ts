import * as THREE from 'three';

// 1. CABIN GLASS (Privacy & Glare)
// Uses Alpha Blending: No optical distortion, perfect sorting, stable against empty backgrounds.
export const configureCabinGlass = (material: THREE.MeshPhysicalMaterial): void => {
  material.color.setHex(0x050505);
  material.transmission = 0.0; // Disabled to prevent Screen-Space Refraction bugs
  material.opacity = 0.8;      // 0.8 creates a premium dark privacy tint
  
  material.metalness = 0.0; 
  material.roughness = 0.0; 
  
  // High clearcoat and envMap to boost Fresnel reflections 
  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.0;
  material.envMapIntensity = 2.5; 
  
  material.transparent = true;
  material.depthWrite = false; 
  material.needsUpdate = true;
};

// 2. OPTICAL LIGHTS GLASS (Headlights & Taillights)
// Uses Physical Transmission: Perfect optical clarity, bends light inside the headlight housing.
export const configureLightsGlass = (material: THREE.MeshPhysicalMaterial): void => {
  material.color.setHex(0xffffff);
  material.transmission = 1.0;     
  material.opacity = 1.0; 
  
  // FIX: Set IOR to 1.0 (Air) to eliminate the "magnifying glass" distortion on curved meshes
  material.ior = 1.0; 
  material.thickness = 0.1; 
  
  material.metalness = 0.0; 
  material.roughness = 0.0; 
  
  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.0;
  
  // Boosted slightly to ensure the glass still catches HDR reflections despite IOR 1.0
  material.envMapIntensity = 2.0; 
  
  material.transparent = true;
  material.depthWrite = false;
  material.needsUpdate = true;
};