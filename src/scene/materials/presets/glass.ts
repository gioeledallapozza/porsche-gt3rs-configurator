import * as THREE from 'three';

export const configureGlass = (material: THREE.MeshPhysicalMaterial): void => {
  material.transmission = 1.0;
  material.ior = 1.52;
  material.thickness = 0.05;
  material.roughness = 0.0;
  material.attenuationColor.setHex(0xffffff);
  material.attenuationDistance = 2.0;
  material.envMapIntensity = 1.5;
  material.transparent = true;
  material.needsUpdate = true;
};