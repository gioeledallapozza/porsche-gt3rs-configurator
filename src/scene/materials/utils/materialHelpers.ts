import * as THREE from 'three';

// Safely deep copy paint-related properties. 
// Forces nullification if source doesn't have the property to prevent bleeding.
export function copyPaintProps(target: THREE.MeshPhysicalMaterial, source: THREE.MeshPhysicalMaterial): void {
  if (!target || !source) return;

  if (target.color && source.color) target.color.copy(source.color);
  if (typeof source.metalness === 'number') target.metalness = source.metalness;
  if (typeof source.roughness === 'number') target.roughness = source.roughness;
  if (typeof source.clearcoat === 'number') target.clearcoat = source.clearcoat;
  if (typeof source.clearcoatRoughness === 'number') target.clearcoatRoughness = source.clearcoatRoughness;

  target.sheen = source.sheen ?? 0.0;
  if (source.sheenColor && target.sheenColor) target.sheenColor.copy(source.sheenColor);

  target.map = source.map || null;
  target.normalMap = source.normalMap || null;
  target.roughnessMap = source.roughnessMap || null;

  if (source.normalScale && target.normalScale && typeof target.normalScale.copy === 'function') {
    target.normalScale.copy(source.normalScale);
  }

  target.envMap = source.envMap || null;
  if (typeof source.envMapIntensity === 'number') target.envMapIntensity = source.envMapIntensity;

  target.needsUpdate = true;
}