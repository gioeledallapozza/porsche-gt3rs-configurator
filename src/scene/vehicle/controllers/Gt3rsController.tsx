import React, { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { invalidate } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useConfiguratorStore } from '@/store/configuratorStore';
import Gt3rsModel from '@/scene/vehicle/models/Gt3rsModel.tsx';
import { applyBlackPlastic, applyCarbonFiber } from '@/scene/materials/presets/carbonFiber';
import { configureGlass } from '@/scene/materials/presets/glass';
import { useKtx2Disposal } from '@/hooks/useKtx2Disposal';



// Memoize the Gt3rsModel component to prevent unnecessary re-renders
const MemoizedGt3rsModel = React.memo(Gt3rsModel);

// Safely copy only paint-related properties from one material to another.
// This avoids MeshMaterial.copy() trying to copy nested vectors that may be undefined.
function copyPaintProps(target: any, source: any) {
  if (!target || !source) return;

  if (target.color && source.color) target.color.copy(source.color);
  if (typeof source.metalness === 'number') target.metalness = source.metalness;
  if (typeof source.roughness === 'number') target.roughness = source.roughness;
  if (typeof source.clearcoat === 'number') target.clearcoat = source.clearcoat;
  if (typeof source.clearcoatRoughness === 'number') target.clearcoatRoughness = source.clearcoatRoughness;

  if (source.map) target.map = source.map;
  if (source.normalMap) target.normalMap = source.normalMap;
  if (source.roughnessMap) target.roughnessMap = source.roughnessMap;

  // Guard vector copies
  if (source.normalScale && target.normalScale && typeof target.normalScale.copy === 'function') {
    target.normalScale.copy(source.normalScale);
  }

  target.needsUpdate = true;
}

interface Gt3rsControllerProps {
  modelPath: string;
}

export default function Gt3rsController({ modelPath }: Gt3rsControllerProps) {
  const { materials } = useGLTF(modelPath); //Extract materials from the GLTF model

  // useKTX2 automatically integrates with Suspense and the KTX2Loader
  const carbonNormal = useKtx2Disposal('/textures/materials/carbon/carbon_twill_v1_normal_1k.ktx2');
  const carbonRoughness = useKtx2Disposal('/textures/materials/carbon/carbon_twill_v1_roughness_1k.ktx2');

  useMemo(() => {
    // Only apply wrapping if the textures are successfully loaded
    if (carbonNormal && carbonRoughness) {
      carbonNormal.wrapS = carbonNormal.wrapT = THREE.RepeatWrapping;
      carbonRoughness.wrapS = carbonRoughness.wrapT = THREE.RepeatWrapping;
      
      // Ensure color space is strictly linear for data textures (Normal/Roughness)
      carbonNormal.colorSpace = THREE.LinearSRGBColorSpace;
      carbonRoughness.colorSpace = THREE.LinearSRGBColorSpace;
    }
  }, [carbonNormal, carbonRoughness]);

  // Memoize materials 
  const mats = useMemo(() => {
    const extractedMaterials = {
      paint: materials.Material_Chassis_Paint as THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial,
      glass: materials.Material_Glass_Static as THREE.MeshPhysicalMaterial,
      carbonTrimStatic: materials.Material_Carbon_Trim_Static as THREE.MeshPhysicalMaterial,
      exteriorLowerAero: materials.Material_Exterior_LowerAero_Dynamic as THREE.MeshPhysicalMaterial,
      exteriorWeissach: materials.Material_Exterior_Weissach_Dynamic as THREE.MeshPhysicalMaterial,
    };

    const initialState = useConfiguratorStore.getState();
    extractedMaterials.paint.color.set(initialState.carColor);

    //STATIC SETUP
    configureGlass(extractedMaterials.glass);
    // applyBlackPlastic(extractedMaterials.exteriorLowerAero); //Not necessary iin blender the colors are already ok

    // PURGE BLENDER GARBAGE DATA ONCE
    // We destroy the baked image map from Blender. True WebGL carbon only needs normals.
    if (extractedMaterials.exteriorWeissach.map) {
      extractedMaterials.exteriorWeissach.map = null;
      // CRITICAL: Force shader recompilation immediately to avoid future lag
      extractedMaterials.exteriorWeissach.needsUpdate = true; 
    }

    // INITIAL WEISSACH INJECTION
    if (initialState.aeroPackage !== 'weissach') {
      // DEEP COPY: Perfectly clone all paint properties (metalness, roughness, etc.)
      // Use a safe copy helper to avoid Three.js copying undefined vector properties
      copyPaintProps(extractedMaterials.exteriorWeissach, extractedMaterials.paint);
    }

    return extractedMaterials;
  }, [materials]);

// APPLY CARBON WHEN DOWNLOAD FINISHES
  useEffect(() => {
    if (!carbonNormal || !carbonRoughness) return; // Aspetta le texture

    // Il trim statico è sempre in carbonio
    applyCarbonFiber(mats.carbonTrimStatic, {
      normalMap: carbonNormal,
      roughnessMap: carbonRoughness,
    });

    // Controlla se il pacchetto Weissach è attivo per applicarlo
    const currentState = useConfiguratorStore.getState();
    if (currentState.aeroPackage === 'weissach') {
      applyCarbonFiber(mats.exteriorWeissach, {
        normalMap: carbonNormal,
        roughnessMap: carbonRoughness,
      });
    }

    invalidate();
  }, [mats, carbonNormal, carbonRoughness]);  

  
// REALTIME MUTATIONS LISTENER
  useEffect(() => {
    const unsubscribe = useConfiguratorStore.subscribe((currentState, prevState) => {
      let needsRender = false;

      // Se cambia il colore vernice
      if (currentState.carColor !== prevState.carColor) {
        mats.paint.color.set(currentState.carColor);
        mats.paint.needsUpdate = true;
        
        // Sincronizza anche le parti Weissach se non sono in carbonio
        if (currentState.aeroPackage !== 'weissach') {
          mats.exteriorWeissach.color.set(currentState.carColor);
          mats.exteriorWeissach.needsUpdate = true;
        }
        needsRender = true;
      }

      // Se cambia il pacchetto aerodinamico
      if (currentState.aeroPackage !== prevState.aeroPackage) {
        if (currentState.aeroPackage === 'weissach' && carbonNormal && carbonRoughness) {
          applyCarbonFiber(mats.exteriorWeissach, { 
            normalMap: carbonNormal, 
            roughnessMap: carbonRoughness 
          });
        } else {
          // Torna verniciato (colore carrozzeria)
          mats.exteriorWeissach.color.set(currentState.carColor);
          mats.exteriorWeissach.normalMap = null;
          mats.exteriorWeissach.roughnessMap = null;
          mats.exteriorWeissach.roughness = mats.paint.roughness;
          mats.exteriorWeissach.clearcoat = 1.0;
          mats.exteriorWeissach.needsUpdate = true;
        }
        needsRender = true;
      }

      if (needsRender) {
        invalidate();
      }
    });

    return unsubscribe;
  }, [mats, carbonNormal, carbonRoughness]);

  return <MemoizedGt3rsModel url={modelPath}/>; //Return the GT3RS model
}