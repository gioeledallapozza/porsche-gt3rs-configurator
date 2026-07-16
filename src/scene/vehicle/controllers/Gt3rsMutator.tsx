import { useEffect } from 'react';
import * as THREE from 'three';
import { invalidate } from '@react-three/fiber';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { applyCarbonFiber, applyForgedCarbon } from '@/scene/materials/presets/carbonFiber';
import { copyPaintProps } from '@/scene/materials/utils/materialHelpers';
import { applyMetallicPaint, applySolidPaint } from '@/scene/materials/presets/paint';

interface Gt3rsMutatorProps {
  mats: Record<string, THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial>;
  textures: {
    carbonNormal: THREE.Texture | null;
    carbonRoughness: THREE.Texture | null;
    forgedNormal: THREE.Texture | null;
    forgedRoughness: THREE.Texture | null;
    flakeNormal: THREE.Texture | null;
  };
}

/* eslint-disable react-hooks/immutability */
export default function Gt3rsMutator({ mats, textures }: Gt3rsMutatorProps) {
  // Extract state specifically (component only re-evaluates when these specific slices change)
  const carColor = useConfiguratorStore((state) => state.carColor);
  const aeroPackage = useConfiguratorStore((state) => state.aeroPackage);

  const paintMat = mats.paint as THREE.MeshPhysicalMaterial;
  const weissachMat = mats.exteriorWeissach as THREE.MeshPhysicalMaterial;

  // CAR COLOR CHANGE
  useEffect(() => {
    if (!paintMat) return;

    const METALLIC_COLORS = ['#111111', '#2f3b33', '#101835'];//TO CHANEG
    const isMetallic = METALLIC_COLORS.includes(carColor.toLowerCase()); 

    if (isMetallic && !textures.flakeNormal) return;

    if (isMetallic && textures.flakeNormal) {
      const isGentianBlue = carColor.toLowerCase() === '#101835';
      applyMetallicPaint(paintMat, carColor, textures.flakeNormal, isGentianBlue);
    } else {
      applySolidPaint(paintMat, carColor);
    }

    // Sync Weissach parts if they are currently painted
    if (aeroPackage === 'standard') {
      copyPaintProps(weissachMat, paintMat);
    }

    invalidate();
  }, [carColor, aeroPackage, paintMat, weissachMat]);


  // AERODYNAMIC PACKAGE CHANGE
  useEffect(() => {
    if (!weissachMat || !textures.carbonNormal || !textures.carbonRoughness) return;

   if (aeroPackage === 'weissach' && textures.carbonNormal && textures.carbonRoughness) {
      applyCarbonFiber(weissachMat, { 
        normalMap: textures.carbonNormal, 
        roughnessMap: textures.carbonRoughness 
      });
    } 
    else if (aeroPackage === 'weissach_forged' && textures.forgedNormal && textures.forgedRoughness) {
      applyForgedCarbon(weissachMat, {
        normalMap: textures.forgedNormal,
        roughnessMap: textures.forgedRoughness
      });
    }
    else if (aeroPackage === 'standard') {
      copyPaintProps(weissachMat, paintMat);
    }
    
    invalidate();
  }, [aeroPackage, paintMat, weissachMat, textures]);


  // Future EVENTS can be easily added here (e.g. Calipers, Wheels) without bloating logic

  return null; // Logic component: returns no visual DOM/WebGL elements
}