import * as THREE from 'three';
import { useLevaStore } from '@/store/levaStore';

interface AluminumTextures {
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
}

export const applyAluminum = (
  material: THREE.MeshPhysicalMaterial,
  textures: AluminumTextures
): void => {
  const tweaks = useLevaStore.getState().aluminum;

  material.color.set(tweaks.color);

  material.normalMap = textures.normalMap;
  material.normalScale.set(tweaks.normalScale, tweaks.normalScale);
  
  material.roughnessMap = textures.roughnessMap;

  material.roughness = tweaks.roughness;
  
  material.metalness = tweaks.metalness;
  
  material.clearcoat = tweaks.clearcoat;
  material.clearcoatRoughness = tweaks.clearcoatRoughness;
  material.clearcoatNormalMap = null;
  material.envMapIntensity = tweaks.envMapIntensity;
  
  material.needsUpdate = true;
};
