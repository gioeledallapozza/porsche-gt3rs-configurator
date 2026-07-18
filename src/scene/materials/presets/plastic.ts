import * as THREE from 'three';

export const applyBlackPlastic = (material: THREE.MeshPhysicalMaterial): void => {
  material.color.setHex(0x000000);
  material.normalMap = null;
  material.roughnessMap = null;

  material.roughness = 0.85;
  material.metalness = 0.0;

  material.clearcoat = 0.1;
  material.clearcoatRoughness = 0.8;
  material.sheen = 0.0;
  material.needsUpdate = true;
};
