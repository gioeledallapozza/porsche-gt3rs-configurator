import { useEffect } from 'react';
import * as THREE from 'three';
import { invalidate } from '@react-three/fiber';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { applyCarbonFiber } from '@/scene/materials/presets/carbonFiber';
import { copyPaintProps } from '@/scene/materials/utils/materialHelpers';

interface Gt3rsMutatorProps {
  mats: Record<string, THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial>;
  textures: {
    carbonNormal: THREE.Texture | null;
    carbonRoughness: THREE.Texture | null;
  };
}

export default function Gt3rsMutator({ mats, textures }: Gt3rsMutatorProps) {
  // Extract state specifically (component only re-evaluates when these specific slices change)
  const carColor = useConfiguratorStore((state) => state.carColor);
  const aeroPackage = useConfiguratorStore((state) => state.aeroPackage);

  const paintMat = mats.paint as THREE.MeshPhysicalMaterial;
  const weissachMat = mats.exteriorWeissach as THREE.MeshPhysicalMaterial;

  // CAR COLOR CHANGE
  useEffect(() => {
    if (!paintMat) return;

    paintMat.color.set(carColor);
    paintMat.needsUpdate = true;

    // Sync Weissach parts if they are currently painted
    if (aeroPackage !== 'weissach') {
      weissachMat.color.set(carColor);
      weissachMat.needsUpdate = true;
    }
    
    invalidate();
  }, [carColor, aeroPackage, paintMat, weissachMat]);


  // AERODYNAMIC PACKAGE CHANGE
  useEffect(() => {
    if (!weissachMat || !textures.carbonNormal || !textures.carbonRoughness) return;

    if (aeroPackage === 'weissach') {
      applyCarbonFiber(weissachMat, { 
        normalMap: textures.carbonNormal, 
        roughnessMap: textures.carbonRoughness 
      });
    } else {
      copyPaintProps(weissachMat, paintMat);
    }
    
    invalidate();
  }, [aeroPackage, paintMat, weissachMat, textures]);


  // Future EVENTS can be easily added here (e.g. Calipers, Wheels) without bloating logic

  return null; // Logic component: returns no visual DOM/WebGL elements
}