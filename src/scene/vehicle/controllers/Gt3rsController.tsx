import React, { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { invalidate } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import Gt3rsModel from '@/scene/vehicle/models/Gt3rsModel.tsx';
import { configureCabinGlass, configureLightsGlass } from '@/scene/materials/presets/glass';
import { applyCarbonFiber } from '@/scene/materials/presets/carbonFiber';
import { useKtx2Disposal } from '@/hooks/useKtx2Disposal';
import { 
  configureHeadlightDRL, 
  configureTaillightEmissive, 
  configureSignalEmissive, 
  configureLicensePlateLight 
} from '@/scene/materials/presets/lights';
import Gt3rsMutator from './Gt3rsMutator'; // Import the new logic component

const MemoizedGt3rsModel = React.memo(Gt3rsModel);

interface Gt3rsControllerProps {
  modelPath: string;
}

/* eslint-disable react-hooks/immutability */
export default function Gt3rsController({ modelPath }: Gt3rsControllerProps) {
  //Assets loading
  const { materials } = useGLTF(modelPath); 
  //To define which carbon texture to load
  const carbonNormal = useKtx2Disposal('/textures/materials/carbon/carbon_twill_v1_normal_1k.ktx2');
  const carbonRoughness = useKtx2Disposal('/textures/materials/carbon/carbon_twill_v1_roughness_1k.ktx2');

  // TEXTURES SETUPS
  useMemo(() => {
    if (carbonNormal && carbonRoughness) {
      carbonNormal.wrapS = carbonNormal.wrapT = THREE.RepeatWrapping;
      carbonRoughness.wrapS = carbonRoughness.wrapT = THREE.RepeatWrapping;
      carbonNormal.colorSpace = THREE.LinearSRGBColorSpace;
      carbonRoughness.colorSpace = THREE.LinearSRGBColorSpace;
    }
  }, [carbonNormal, carbonRoughness]);

  // STATIC MATERIAL INITIALIZATION
  const mats = useMemo(() => {
    const extractedMaterials = {
      // Standard
      paint: materials.Material_Chassis_Paint as THREE.MeshPhysicalMaterial,
      glassCabin: materials.Material_Glass_Cabin_Static as THREE.MeshPhysicalMaterial,
      glassLights: materials.Material_Glass_Lights_Static as THREE.MeshPhysicalMaterial,
      carbonTrimStatic: materials.Material_Carbon_Trim_Static as THREE.MeshPhysicalMaterial,
      exteriorLowerAero: materials.Material_Exterior_LowerAero_Dynamic as THREE.MeshPhysicalMaterial,
      exteriorWeissach: materials.Material_Exterior_Weissach_Dynamic as THREE.MeshPhysicalMaterial,

      // Emissives
      headlightEmissive: materials.Material_Headlight_Emissive as THREE.MeshStandardMaterial,
      taillightBrakeEmissive: materials.Material_Taillight_Brake_Emissive as THREE.MeshStandardMaterial,
      taillightEmissive: materials.Material_Taillight_Emissive as THREE.MeshStandardMaterial,
      signalEmissive: materials.Material_Signal_Emissive as THREE.MeshStandardMaterial,
      licensePlateLight: materials.Material_LicensePlateLight_Emissive as THREE.MeshStandardMaterial,
    };

    // Glass
    configureCabinGlass(extractedMaterials.glassCabin);
    configureLightsGlass(extractedMaterials.glassLights);

    // Emissive
    configureHeadlightDRL(extractedMaterials.headlightEmissive);
    configureTaillightEmissive(extractedMaterials.taillightBrakeEmissive);
    configureTaillightEmissive(extractedMaterials.taillightEmissive);
    configureSignalEmissive(extractedMaterials.signalEmissive);
    configureLicensePlateLight(extractedMaterials.licensePlateLight);

    // PURGE BLENDER TEXTURES
    if (extractedMaterials.exteriorWeissach.map) {
      extractedMaterials.exteriorWeissach.map = null;
      extractedMaterials.exteriorWeissach.needsUpdate = true; 
    }

    return extractedMaterials;
  }, [materials]);

  // ASYNCHRONOUS STATUC SETUP  (Cannot be runned in the useMemo because the textures need to be loaded)
  useEffect(() => {
    if (carbonNormal && carbonRoughness) {
      applyCarbonFiber(mats.carbonTrimStatic, {
        normalMap: carbonNormal,
        roughnessMap: carbonRoughness,
      });
      invalidate();
    }
  }, [mats, carbonNormal, carbonRoughness]); //Will be called once the textures are ready

  // Orchestration
  return (
    <>
      <Gt3rsMutator 
        mats={mats} 
        textures={{ carbonNormal, carbonRoughness }} 
      />
      <MemoizedGt3rsModel url={modelPath} />
    </>
  );
}