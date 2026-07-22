import { useLevaStore } from '@/store/levaStore';
import * as THREE from 'three';

// Front Daytime Running Lights (DRL) - Pure electric white
export const configureHeadlightDRL = (material: THREE.MeshStandardMaterial): void => {
  const tweaks = useLevaStore.getState().headlight;

  material.color.set(tweaks.color);
  material.emissive.set(tweaks.emissive);
  material.emissiveIntensity = tweaks.emissiveIntensity;

  material.toneMapped = false; 

  material.roughness = tweaks.roughness;
  material.metalness = tweaks.metalness;
  material.envMapIntensity = tweaks.envMapIntensity;
  material.needsUpdate = true;
};

// Rear Taillights - Porsche Signature Red
export const configureTaillightEmissive = (material: THREE.MeshStandardMaterial): void => {
  const tweaks = useLevaStore.getState().taillight;

  material.color.set(tweaks.color);
  material.emissive.set(tweaks.emissive); 
  material.emissiveIntensity = tweaks.emissiveIntensity; 
  
  material.toneMapped = false; 
  
  material.roughness = tweaks.roughness;
  material.metalness = tweaks.metalness;
  material.envMapIntensity = tweaks.envMapIntensity;
  material.needsUpdate = true;
};

// Turn Signals - Amber/Orange
export const configureSignalEmissive = (material: THREE.MeshStandardMaterial): void => {
  const tweaks = useLevaStore.getState().signal;

  material.color.set(tweaks.color);
  material.emissive.set(tweaks.emissive);
  material.emissiveIntensity = tweaks.emissiveIntensity;
  
  material.toneMapped = false;
  
  material.roughness = tweaks.roughness;
  material.metalness = tweaks.metalness;
  material.envMapIntensity = tweaks.envMapIntensity;
  material.needsUpdate = true;
};

// License Plate LEDs - Cool white
export const configureLicensePlateLight = (material: THREE.MeshStandardMaterial): void => {
  const tweaks = useLevaStore.getState().licensePlate;

  material.color.set(tweaks.color);
  material.emissive.set(tweaks.emissive);
  material.emissiveIntensity = tweaks.emissiveIntensity;
  
  material.toneMapped = false;
  
  material.roughness = tweaks.roughness;
  material.metalness = tweaks.metalness;
  material.envMapIntensity = tweaks.envMapIntensity;
  material.needsUpdate = true;
};