import * as THREE from 'three';

// Front Daytime Running Lights (DRL) - Pure electric white
export const configureHeadlightDRL = (material: THREE.MeshStandardMaterial): void => {
  material.color.setHex(0xffffff);
  material.emissive.setHex(0xffffff);
  material.emissiveIntensity = 3.0; // High intensity for optical glare
  
  // CRITICAL: Bypasses the camera's tone mapping. 
  // This allows the color values to exceed 1.0, creating a true light-emitting diode look
  // perfectly ready for an EffectComposer Bloom pass later.
  material.toneMapped = false; 
  
  // Emissive surfaces shouldn't reflect the environment
  material.roughness = 1.0;
  material.metalness = 0.0;
  material.needsUpdate = true;
};

// Rear Taillights - Porsche Signature Red
export const configureTaillightEmissive = (material: THREE.MeshStandardMaterial): void => {
  material.color.setHex(0xd30000);
  material.emissive.setHex(0xff0000); 
  material.emissiveIntensity = 2.5; 
  material.toneMapped = false; 
  material.roughness = 1.0;
  material.metalness = 0.0;
  material.needsUpdate = true;
};

// Turn Signals - Amber/Orange
export const configureSignalEmissive = (material: THREE.MeshStandardMaterial): void => {
  material.color.setHex(0xff9900);
  material.emissive.setHex(0xff6600);
  material.emissiveIntensity = 2.0;
  material.toneMapped = false;
  material.roughness = 1.0;
  material.metalness = 0.0;
  material.needsUpdate = true;
};

// License Plate LEDs - Cool white
export const configureLicensePlateLight = (material: THREE.MeshStandardMaterial): void => {
  material.color.setHex(0xedf2ff);
  material.emissive.setHex(0xedf2ff);
  material.emissiveIntensity = 1.5;
  material.toneMapped = false;
  material.roughness = 1.0;
  material.metalness = 0.0;
  material.needsUpdate = true;
};