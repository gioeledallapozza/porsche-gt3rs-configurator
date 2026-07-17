import * as THREE from 'three';

export const applyBlackPlastic = (material: THREE.MeshPhysicalMaterial): void => {
  material.color.setHex(0x222222);
  material.normalMap = null;
  material.roughnessMap = null;
  material.roughness = 0.85;
  material.clearcoat = 0.0;
  material.clearcoatRoughness = 0.0;
  material.sheen = 0.0;
  material.needsUpdate = true;
};
