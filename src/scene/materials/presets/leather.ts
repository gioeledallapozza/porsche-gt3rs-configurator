import * as THREE from 'three';
// import { useLevaStore } from '@/store/levaStore';

export const applyLeather = (
  material: THREE.MeshPhysicalMaterial, 
  hexColor: string
): void => {
  material.color.set(hexColor);
  
  material.roughness = 0.75; // La pelle dell'abitacolo non è mai troppo lucida
  material.metalness = 0.0;
  
  material.clearcoat = 0.0;
  
  // Lo Sheen simula la retro-illuminazione dei micro-peli/pori tipica della pelle vera
  material.sheen = 0.35; 
  material.sheenRoughness = 0.6;
  material.sheenColor.setHex(0xffffff);
  
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