import React, { useEffect, useMemo } from 'react';
import type { MeshStandardMaterial } from 'three';
import { invalidate } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useConfiguratorStore } from '@/store/configuratorStore';
import Gt3rsModel from '@/scene/vehicle/models/Gt3rsModel.tsx';



// Memoize the Gt3rsModel component to prevent unnecessary re-renders
const MemoizedGt3rsModel = React.memo(Gt3rsModel);

interface Gt3rsControllerProps {
  modelPath: string;
}

export default function Gt3rsController({ modelPath }: Gt3rsControllerProps) {
  const { materials } = useGLTF(modelPath); //Extract materials from the GLTF model

  // Memoize materials 
  const mats = useMemo(() => ({
    paint: materials.Material_Chassis_Paint as MeshStandardMaterial,
    caliper: materials.Material_Caliper_Dynamic as MeshStandardMaterial,
    rim: materials.Material_Rim_Primary as MeshStandardMaterial,
    stitching: materials.Material_Interior_Stitching_Dynamic as MeshStandardMaterial,
  }), [materials]);

  // Status Management
 useEffect(() => {
    if (!mats.paint) return;

    // Inject the current state into the materials
    const state = useConfiguratorStore.getState();
    mats.paint.color.set(state.carColor);
    //mats.caliper.color.set(state.caliperColor);
    invalidate();

    // Subscribe to store changes
    const unsubscribe = useConfiguratorStore.subscribe((currentState, prevState) => {
      let needsRender = false;

      if (currentState.carColor !== prevState.carColor) {
        mats.paint.color.set(currentState.carColor);
        needsRender = true;
      }
      
      // Setup for future extensions
      /*
      if (currentState.caliperColor !== prevState.caliperColor) {
        mats.caliper.color.set(currentState.caliperColor);
        needsRender = true;
      }
      
      if (currentState.stitchingColor !== prevState.stitchingColor) {
        mats.stitching.color.set(currentState.stitchingColor);
        needsRender = true;
      }
      */

      if (needsRender) {
        invalidate();
      }
    });

    return unsubscribe; //CLeanup
  }, [mats]);

  return <MemoizedGt3rsModel url={modelPath}/>; //Return the GT3RS model
}