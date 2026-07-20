import React, { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { invalidate, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import Gt3rsModel from '@/scene/vehicle/models/Gt3rsModel.tsx';
import { configureCabinGlass, configureLightsGlass } from '@/scene/materials/presets/glass';
import { applyBlackPlastic } from '@/scene/materials/presets/plastic';
import { applyCarbonFiber, applyForgedCarbon } from '@/scene/materials/presets/carbonFiber';
import { useKtx2Disposal } from '@/hooks/useKtx2Disposal';
import { 
  configureHeadlightDRL, 
  configureTaillightEmissive, 
  configureSignalEmissive, 
  configureLicensePlateLight 
} from '@/scene/materials/presets/lights';
import Gt3rsMutator from './Gt3rsMutator'; // Import the new logic component
import { useConfiguratorStore } from '@/store/configuratorStore';
import { applyMetallicPaint, applySolidPaint, applySpecialPaint } from '@/scene/materials/presets/paint';
import { gt3rsConfig } from '@/config/vehicles/gt3rs.config.ts';

const MemoizedGt3rsModel = React.memo(Gt3rsModel);

interface Gt3rsControllerProps {
  modelPath: string;
}

/* eslint-disable react-hooks/immutability */
export default function Gt3rsController({ modelPath }: Gt3rsControllerProps) {
  //Assets loading
  const { materials } = useGLTF(modelPath); 
  const { scene, gl } = useThree();
  
  //To define which carbon texture to load
  const carbonNormal = useKtx2Disposal('/textures/materials/carbon/carbon_twill_v1_normal_1k.ktx2');
  const carbonRoughness = useKtx2Disposal('/textures/materials/carbon/carbon_twill_v1_roughness_1k.ktx2');
  const forgedNormal = useKtx2Disposal('/textures/materials/carbon/carbon_forged_v1_normal_1k.ktx2');
  const forgedRoughness = useKtx2Disposal('/textures/materials/carbon/carbon_forged_v1_roughness_1k.ktx2');
  //const flakeNormal = useKtx2Disposal('/textures/materials/flakes/flakes_v5_normal_2k.ktx2');

  // TEXTURES SETUPS
  useMemo(() => {
   // Twill Carbon
    if (carbonNormal && carbonRoughness) {
      carbonNormal.wrapS = carbonNormal.wrapT = THREE.RepeatWrapping;
      carbonRoughness.wrapS = carbonRoughness.wrapT = THREE.RepeatWrapping;

      carbonNormal.minFilter = THREE.LinearMipMapLinearFilter;
      carbonRoughness.minFilter = THREE.LinearMipMapLinearFilter;

      carbonNormal.anisotropy = gl.capabilities.getMaxAnisotropy();
      carbonRoughness.anisotropy = gl.capabilities.getMaxAnisotropy();

      carbonNormal.colorSpace = THREE.NoColorSpace;
      carbonRoughness.colorSpace = THREE.NoColorSpace;
    }
    // Forged Carbon
    if (forgedNormal && forgedRoughness) {
      forgedNormal.wrapS = forgedNormal.wrapT = THREE.RepeatWrapping;
      forgedRoughness.wrapS = forgedRoughness.wrapT = THREE.RepeatWrapping;

      forgedNormal.minFilter = THREE.LinearMipMapLinearFilter;
      forgedRoughness.minFilter = THREE.LinearMipMapLinearFilter;

      forgedNormal.anisotropy = gl.capabilities.getMaxAnisotropy();
      forgedRoughness.anisotropy = gl.capabilities.getMaxAnisotropy();
      
      forgedNormal.colorSpace = THREE.NoColorSpace;
      forgedRoughness.colorSpace = THREE.NoColorSpace;
    }
  }, [carbonNormal, carbonRoughness, forgedNormal, forgedRoughness, gl.capabilities]);

  // STATIC MATERIAL INITIALIZATION
  const mats = useMemo(() => {

    [carbonNormal, carbonRoughness, forgedNormal, forgedRoughness].forEach(tex => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.minFilter = THREE.LinearMipMapLinearFilter;
      tex.anisotropy = gl.capabilities.getMaxAnisotropy();
      tex.colorSpace = THREE.NoColorSpace;
    });

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

    // Plastic
    applyBlackPlastic(extractedMaterials.exteriorLowerAero)
    
    // PURGE BLENDER TEXTURES
    if (extractedMaterials.exteriorWeissach.map) {
      extractedMaterials.exteriorWeissach.map = null;
      extractedMaterials.exteriorWeissach.needsUpdate = true; 
    }

    applyCarbonFiber(extractedMaterials.carbonTrimStatic, {
      normalMap: carbonNormal,
      roughnessMap: carbonRoughness,
    });

    const { carColor, aeroPackage } = useConfiguratorStore.getState(); //Get initial configuration
    const activeColorConfig = gt3rsConfig.paintOptions.find(
      (opt) => opt.hex.toLowerCase() === carColor.toLowerCase()
    );

    if (activeColorConfig) {
      const applyPaint = (mat: THREE.MeshPhysicalMaterial) => {
        if (activeColorConfig.finish === 'solid') applySolidPaint(mat, activeColorConfig.hex);
        else if (activeColorConfig.finish === 'metallic') applyMetallicPaint(mat, activeColorConfig.hex);
        else applySpecialPaint(mat, activeColorConfig);
      };

      // Colore Carrozzeria Iniziale
      applyPaint(extractedMaterials.paint);
      
      // Aero Package Iniziale
      if (aeroPackage === 'weissach') {
        applyCarbonFiber(extractedMaterials.exteriorWeissach, { normalMap: carbonNormal, roughnessMap: carbonRoughness });
      } else if (aeroPackage === 'weissach_forged') {
        applyForgedCarbon(extractedMaterials.exteriorWeissach, { normalMap: forgedNormal, roughnessMap: forgedRoughness });
      } else {
        applyPaint(extractedMaterials.exteriorWeissach);
      }
    }

    // 3. EnvMap (se l'ambiente è già caricato via Suspense)
    if (scene.environment) {
      Object.values(extractedMaterials).forEach((mat) => {
        if ('envMap' in mat) mat.envMap = scene.environment;
      });
    }

    return extractedMaterials;
  }, [materials, carbonNormal, carbonRoughness, forgedNormal, forgedRoughness, gl, scene.environment]);

  // ASYNCHRONOUS STATUC SETUP  (Cannot be runned in the useMemo because the textures need to be loaded)
  // useEffect(() => {
  //   if (carbonNormal && carbonRoughness) {
  //     applyCarbonFiber(mats.carbonTrimStatic, {
  //       normalMap: carbonNormal,
  //       roughnessMap: carbonRoughness,
  //     });

  //     invalidate();
  //   }
  // }, [mats, carbonNormal, carbonRoughness]); //Will be called once the textures are ready

  // EXPLICIT INJECTION OF ENVMAP (the useMemo load the materials before the envmap is loaded)
  useEffect(() => {
    
    if (!scene.environment) return;

    //Iterate through all materials
    Object.values(mats).forEach((mat) => {
      // If the material support the envMap and is null update it
      if ('envMap' in mat && mat.envMap === null) {
        mat.envMap = scene.environment;
        mat.needsUpdate = true;
      }
    });

    invalidate();
  }, [mats, scene.environment]);

  // Orchestration
  return (
    <>
      <Gt3rsMutator 
        mats={mats} 
        textures={{ carbonNormal, carbonRoughness, forgedNormal, forgedRoughness }}
      />
      <MemoizedGt3rsModel url={modelPath} />
    </>
  );
}