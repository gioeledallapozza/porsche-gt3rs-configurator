import * as THREE from 'three';

export const applyBlackPlastic = (material: THREE.MeshPhysicalMaterial): void => {
  material.color.setHex(0x111111);
  material.normalMap = null;
  material.roughnessMap = null;

  material.roughness = 0.75;
  material.metalness = 0.0;

  material.clearcoat = 0.0;
  material.clearcoatRoughness = 0.8;
  material.sheen = 0.0;
  material.iridescence = 0.0;
  material.needsUpdate = true;
};
