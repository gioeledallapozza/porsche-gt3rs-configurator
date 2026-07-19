import { useEffect } from 'react';
import * as THREE from 'three';
import { invalidate } from '@react-three/fiber';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { applyCarbonFiber, applyForgedCarbon } from '@/scene/materials/presets/carbonFiber';
import { copyPaintProps } from '@/scene/materials/utils/materialHelpers';
import { applyMetallicPaint, applySolidPaint } from '@/scene/materials/presets/paint';
import { gt3rsConfig } from '@/config/vehicles/gt3rs.config';

interface Gt3rsMutatorProps {
  mats: Record<string, THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial>;
  textures: {
    carbonNormal: THREE.Texture | null;
    carbonRoughness: THREE.Texture | null;
    forgedNormal: THREE.Texture | null;
    forgedRoughness: THREE.Texture | null;
    flakeNormal: THREE.Texture | null;
    weissachFlakeNormal: THREE.Texture | null;
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

    //Determinate type of paint
    const activeColorConfig = gt3rsConfig.paintOptions.find(
      (opt) => opt.hex.toLowerCase() === carColor.toLowerCase()
    );
    const isMetallic = activeColorConfig?.finish === 'metallic';

    if (isMetallic && textures.flakeNormal) {
      const isGentianBlue = activeColorConfig.name === 'Gentian Blue';
      applyMetallicPaint(paintMat, carColor, textures.flakeNormal, isGentianBlue);
    } else {
      applySolidPaint(paintMat, carColor);
    }

    // Sync Weissach parts if they are currently painted
    if (aeroPackage === 'standard') {
      copyPaintProps(weissachMat, paintMat);
    }

    invalidate();
  }, [carColor, aeroPackage, paintMat, weissachMat, textures.flakeNormal]);


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
      
      if (paintMat.normalMap === textures.flakeNormal && textures.weissachFlakeNormal) {
        weissachMat.normalMap = textures.weissachFlakeNormal;
        weissachMat.needsUpdate = true;
      }
    }
    
    invalidate();
  }, [aeroPackage, paintMat, weissachMat, textures]);


  // Future EVENTS can be easily added here (e.g. Calipers, Wheels) without bloating logic

  return null; // Logic component: returns no visual DOM/WebGL elements
}