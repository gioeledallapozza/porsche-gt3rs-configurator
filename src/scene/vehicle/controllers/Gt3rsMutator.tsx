import { useCallback, useEffect } from 'react';
import * as THREE from 'three';
import { invalidate } from '@react-three/fiber';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { applyCarbonFiber, applyForgedCarbon } from '@/scene/materials/presets/carbonFiber';
import { applyPlastic } from '@/scene/materials/presets/plastic';
import { applyMetallicPaint, applySolidPaint, applySpecialPaint } from '@/scene/materials/presets/paint';
import { applyLeather, applyStitching } from '@/scene/materials/presets/leather';
import { applyPolyester } from '@/scene/materials/presets/polyester';
import { applyAluminum } from '@/scene/materials/presets/aluminum';
import { gt3rsConfig } from '@/config/vehicles/gt3rs.config';
import { applyAlloyFinish } from '@/scene/materials/presets/metals';
import { applyCaliperPaint } from '@/scene/materials/presets/caliper';

interface Gt3rsMutatorProps {
  mats: Record<string, THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial>;
  textures: {
    carbonNormal: THREE.Texture | null;
    carbonRoughness: THREE.Texture | null;
    forgedNormal: THREE.Texture | null;
    forgedRoughness: THREE.Texture | null;
    aluminumNormal: THREE.Texture | null;
    aluminumRoughness: THREE.Texture | null;
    leatherNormal: THREE.Texture | null;
    leatherArm: THREE.Texture | null;
  };
}

export default function Gt3rsMutator({ mats, textures }: Gt3rsMutatorProps) {
  // Extract state specifically (component only re-evaluates when these specific slices change)
  //Exterior
  const carColor = useConfiguratorStore((state) => state.carColor);
  const aeroPackage = useConfiguratorStore((state) => state.aeroPackage);
  const wheelColor = useConfiguratorStore((state) => state.wheelColor);
  const caliperColor = useConfiguratorStore((state) => state.caliperColor);

  //Interior
  const interiorTrimPackage = useConfiguratorStore((state) => state.interiorTrimPackage); 
  const interiorColor = useConfiguratorStore((state) => state.interiorColor);
  const stitchingColor = useConfiguratorStore((state) => state.stitchingColor);
  const seatbeltColor = useConfiguratorStore((state) => state.seatbeltColor);

  //Exterior Materials
  const paintMat = mats.paint as THREE.MeshPhysicalMaterial;
  const weissachMat = mats.exteriorWeissach as THREE.MeshPhysicalMaterial;
  const rimPrimaryMat = mats.rimPrimary as THREE.MeshPhysicalMaterial;
  const rimCenterMat = mats.rimCenter as THREE.MeshPhysicalMaterial;
  const caliperMat = mats.caliper as THREE.MeshPhysicalMaterial;

  //Interior Materials
  const interiorTrimMat = mats.interiorTrim as THREE.MeshPhysicalMaterial;
  const leatherPrimaryMat = mats.leatherPrimary as THREE.MeshPhysicalMaterial;
  const leatherSecondaryMat = mats.leatherSecondary as THREE.MeshPhysicalMaterial;
  const stitchingMat = mats.stitching as THREE.MeshPhysicalMaterial;
  const seatbeltMat = mats.seatbelt as THREE.MeshPhysicalMaterial;

  //CORE LOGIC: apply paint on a material
 const applyPaintToMaterial = useCallback((material: THREE.MeshPhysicalMaterial) => {
    const activeColorConfig = gt3rsConfig.paintOptions.find(
      (opt) => opt.hex.toLowerCase() === carColor.toLowerCase()
    );

    if (!activeColorConfig) return;

    switch (activeColorConfig.finish) {
      case 'solid':
        applySolidPaint(material, activeColorConfig.hex);
        break;
      case 'metallic':
        applyMetallicPaint(material, activeColorConfig.hex);
        break;
      case 'special':
        applySpecialPaint(material, activeColorConfig); 
        break;
    }
  }, [carColor]);

  // CAR COLOR CHANGE
  useEffect(() => {
    if (!paintMat) return;

    applyPaintToMaterial(paintMat);

    if (aeroPackage === 'standard') {
      applyPaintToMaterial(weissachMat);
    }

    invalidate();
  }, [carColor, aeroPackage, paintMat, weissachMat, textures, applyPaintToMaterial]);


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
      applyPaintToMaterial(weissachMat);
    } 
    
    invalidate();
  }, [aeroPackage, carColor, paintMat, weissachMat, textures, applyPaintToMaterial]);


  // WHEEL COLOR CHANGE
  useEffect(() => {
    if (!rimPrimaryMat || !rimCenterMat) return;

    applyAlloyFinish(rimPrimaryMat, wheelColor);
    applyAlloyFinish(rimCenterMat, wheelColor);

    invalidate();
  }, [wheelColor, rimPrimaryMat, rimCenterMat]);

  // CALIPER COLOR CHANGE
  useEffect(() => {
    if (!caliperMat) return;

    applyCaliperPaint(caliperMat, caliperColor);
    invalidate();
  }, [caliperColor, caliperMat]);

  // STITCHING AND SEATBELT 
  useEffect(() => {
    if (stitchingMat) applyStitching(stitchingMat, stitchingColor);
    if (seatbeltMat) applyPolyester(seatbeltMat, seatbeltColor);
    
    invalidate();
  }, [stitchingColor, seatbeltColor, stitchingMat, seatbeltMat]);

  // LEATHER COLOR CHANGE
  useEffect(() => {
  if (leatherPrimaryMat) {
      applyLeather(leatherPrimaryMat, interiorColor, { normalMap: textures.leatherNormal, armMap: textures.leatherArm });
    }
    
    if (leatherSecondaryMat) {
      applyLeather(leatherSecondaryMat, interiorColor, { normalMap: textures.leatherNormal, armMap: textures.leatherArm });
    }

    invalidate();
  }, [interiorColor, leatherPrimaryMat, leatherSecondaryMat, textures]);

// INTERIOR TRIMS
useEffect(() => {
  if (!interiorTrimMat) return;

  //Cleanup
  interiorTrimMat.normalMap = null;
  interiorTrimMat.roughnessMap = null;
  interiorTrimMat.clearcoatMap = null;

  if (interiorTrimPackage === 'exterior') {
    applyPaintToMaterial(interiorTrimMat);
  } 
  else if (interiorTrimPackage === 'carbon' && textures.carbonNormal && textures.carbonRoughness) {
    applyCarbonFiber(interiorTrimMat, { 
      normalMap: textures.carbonNormal, 
      roughnessMap: textures.carbonRoughness 
    });
  }
  else if (interiorTrimPackage === 'plastic') {
    applyPlastic(interiorTrimMat);
  }
  else if (
    interiorTrimPackage === 'aluminum' &&
    textures.aluminumNormal &&
    textures.aluminumRoughness
  ) {
    applyAluminum(interiorTrimMat, {
      normalMap: textures.aluminumNormal,
      roughnessMap: textures.aluminumRoughness,
    });
  }

  invalidate();
}, [interiorTrimPackage, carColor, interiorTrimMat, textures, applyPaintToMaterial]);
  
  // Future EVENTS can be easily added here (e.g. Calipers, Wheels) without bloating logic

  return null; // Logic component: returns no visual DOM/WebGL elements
}