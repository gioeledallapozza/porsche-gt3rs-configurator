import { useLevaStore } from '@/store/levaStore';
import * as THREE from 'three';

// CABIN GLASS
// No trasmission for WebGL limitation. Because behind the window there is no opaque object
// it fallbacks to env map and return a white color (the CSS background is grey)
export const configureCabinGlass = (material: THREE.MeshPhysicalMaterial): void => {
  const tweaks = useLevaStore.getState().glassCabin;

  material.transmission = 0.0; 
  material.transparent = true; 
  material.color.setHex(0x000000); 
  material.depthWrite = true; 
  material.side = THREE.DoubleSide; 

  material.opacity = tweaks.opacity;
  material.roughness = tweaks.roughness; 
  material.metalness = tweaks.metalness;
  material.clearcoat = tweaks.clearcoat;
  material.clearcoatRoughness = tweaks.clearcoatRoughness;
  material.envMapIntensity = tweaks.envMapIntensity;
  
  material.needsUpdate = true;
};

// 2. OPTICAL LIGHTS GLASS (Headlights & Taillights)
// Uses Physical Transmission: Perfect optical clarity, bends light inside the headlight housing.
export const configureLightsGlass = (material: THREE.MeshPhysicalMaterial): void => {
  const tweaks = useLevaStore.getState().glassLights;

  material.color.setHex(0xffffff);
  material.transparent = true;
  material.depthWrite = false;

  material.transmission = tweaks.transmission;     
  material.opacity = tweaks.opacity; 
  material.ior = tweaks.ior;
  material.thickness = tweaks.thickness;
  material.metalness = tweaks.metalness; 
  material.roughness = tweaks.roughness; 
  material.clearcoat = tweaks.clearcoat;
  material.clearcoatRoughness = tweaks.clearcoatRoughness;
  material.envMapIntensity = tweaks.envMapIntensity;
  
  material.needsUpdate = true;
};