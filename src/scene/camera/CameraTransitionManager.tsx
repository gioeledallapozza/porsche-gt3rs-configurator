import React, { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { cameraPresets } from '@/config/camera/cameraPresets';

interface CameraTransitionManagerProps {
  controlsRef: React.MutableRefObject<CameraControls | null>;
}

//Do not use GSAP for efficiency. 
export default function CameraTransitionManager({ controlsRef }: CameraTransitionManagerProps) {
  // Subscribe only to this specific piece of store data to avoid unnecessary re-renders
  const activePresetId = useConfiguratorStore((state) => state.activeCameraPreset);
  const isInitialRender = useRef(true);

  const { clock, invalidate } = useThree();

  useEffect(() => {
    const preset = cameraPresets.find((p) => p.id === activePresetId);
    if (!preset || !controlsRef.current) return;


    
    const enableTransition = !isInitialRender.current;

    clock.getDelta();

    const controls = controlsRef.current;
    //Set min maxdistance
    controls.minDistance = preset.minDistance ?? 3.5;
    controls.maxDistance = preset.maxDistance ?? 8.0;
    controls.minPolarAngle = preset.minPolarAngle ?? 0;
    controls.maxPolarAngle = preset.maxPolarAngle ?? (Math.PI / 2 - 0.05);
    controls.minAzimuthAngle = preset.minAzimuthAngle ?? -Infinity;
    controls.maxAzimuthAngle = preset.maxAzimuthAngle ?? Infinity;

    // setLookAt(posX, posY, posZ, targetX, targetY, targetZ, enableTransition)
    // The smooth transition automatically handles the interruption if the user clicks another photo mid-motion
    controlsRef.current.setLookAt(
      preset.position[0], preset.position[1], preset.position[2],
      preset.target[0], preset.target[1], preset.target[2],
      enableTransition
    );

    invalidate();

    isInitialRender.current = false;

  }, [activePresetId, controlsRef, clock, invalidate]);

  return null;
}