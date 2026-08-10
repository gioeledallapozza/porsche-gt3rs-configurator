import * as THREE from 'three';
import { useLevaStore } from '@/store/levaStore';

// interface LeatherTextures {
//   normalMap: THREE.Texture | null;
//   // armMap: THREE.Texture | null;
// }

export const applyLeather = (
  material: THREE.MeshPhysicalMaterial,
  hexColor: string,
  textures: { normalMap: THREE.Texture | null; armMap: THREE.Texture | null }
): void => {
  const tweaks = useLevaStore.getState().leather;

  const baseColor = new THREE.Color(hexColor);
  material.color.copy(baseColor);
  
  // material.color.set(hexColor);

  // material.map = null; 
  // material.vertexColors = false;

  material.normalMap = textures.normalMap;
  material.normalScale.set(tweaks.normalScale, tweaks.normalScale);

  material.aoMap = textures.armMap;
  material.aoMapIntensity = 0.1;

  material.roughness = tweaks.roughness;
  material.roughnessMap = textures.armMap;

  // material.metalnessMap = textures.armMap; //DO not use add a little metalness to simulate Ambiennt occlusion map
  material.metalness = tweaks.metalness;

  material.clearcoat = tweaks.clearcoat;
  material.clearcoatRoughness = tweaks.clearcoatRoughness;

  material.sheen = tweaks.sheen;
  material.sheenRoughness = tweaks.sheenRoughness;
  // material.sheenColor.set(hexColor);
  material.sheenColor = baseColor.clone().lerp(new THREE.Color(0xffffff), 0.4);

  material.envMapIntensity = tweaks.envMapIntensity;

  material.needsUpdate = true;
};


export const applyStitching = (
  material: THREE.MeshPhysicalMaterial, 
  hexColor: string
): void => {
  const baseColor = new THREE.Color(hexColor);
  material.color.copy(baseColor);
  
  material.roughness = 0.9;
  material.metalness = 0.0;
  material.clearcoat = 0.0;
  material.sheen = 0.3; 

  material.sheenColor = baseColor.clone().lerp(new THREE.Color(0xffffff), 0.4);

  material.needsUpdate = true;
};