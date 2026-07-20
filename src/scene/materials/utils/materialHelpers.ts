import * as THREE from 'three';

// Safely deep copy paint-related properties. 
// Forces nullification if source doesn't have the property to prevent bleeding.
export function copyPaintProps(target: THREE.MeshPhysicalMaterial, source: THREE.MeshPhysicalMaterial): void {
  if (!target || !source) return;

  if (target.color && source.color) target.color.copy(source.color);
  target.metalness = source.metalness;
  target.roughness = source.roughness;
  target.ior = source.ior;

  target.map = source.map || null;
  target.normalMap = source.normalMap || null;
  if (source.normalScale && target.normalScale) {
    target.normalScale.copy(source.normalScale);
  }
  target.roughnessMap = source.roughnessMap || null;

  target.clearcoat = source.clearcoat;
  target.clearcoatRoughness = source.clearcoatRoughness;
  target.clearcoatNormalMap = source.clearcoatNormalMap || null;
  if (source.clearcoatNormalScale && target.clearcoatNormalScale) {
    target.clearcoatNormalScale.copy(source.clearcoatNormalScale);
  }

  target.sheen = source.sheen;
  target.sheenRoughness = source.sheenRoughness;
  if (source.sheenColor && target.sheenColor) target.sheenColor.copy(source.sheenColor);

  target.envMap = source.envMap || null;
  target.envMapIntensity = source.envMapIntensity;

  target.needsUpdate = true;
}