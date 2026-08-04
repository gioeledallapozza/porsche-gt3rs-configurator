import React, { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
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
  const targetFovRef = useRef(35);

  const { camera, clock, invalidate } = useThree();

  useFrame((_, delta) => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    const nextFov = THREE.MathUtils.damp(perspectiveCamera.fov, targetFovRef.current, 5, delta);

    if (Math.abs(nextFov - perspectiveCamera.fov) > 0.001) {
      perspectiveCamera.fov = nextFov;
      perspectiveCamera.updateProjectionMatrix();
      invalidate();
    }
  });

  useEffect(() => {
    const preset = cameraPresets.find((p) => p.id === activePresetId);
    if (!preset || !controlsRef.current) return;

    const controls = controlsRef.current;

    const enableTransition = !isInitialRender.current;

    clock.getDelta();

    targetFovRef.current = preset.fov ?? 35;

    //Set min maxdistance
    controls.minDistance = preset.minDistance ?? 3.5;
    controls.maxDistance = preset.maxDistance ?? 8.0;
    controls.minPolarAngle = preset.minPolarAngle ?? 0;
    controls.maxPolarAngle = preset.maxPolarAngle ?? (Math.PI / 2 - 0.05);
    controls.minAzimuthAngle = preset.minAzimuthAngle ?? -Infinity;
    controls.maxAzimuthAngle = preset.maxAzimuthAngle ?? Infinity;

    // Fix Calculation of the shortest path to avoid a 360-degree spin.
    if (enableTransition) {

      const targetAzimuth = Math.atan2(
        preset.position[0] - preset.target[0],
        preset.position[2] - preset.target[2]
      );
      const currentAzimuth = controls.azimuthAngle;

      let diff = (targetAzimuth - currentAzimuth) % (Math.PI * 2);

      // If the difference between the two angles is bigger than 180 we are making the longest path
      if (diff > Math.PI) diff -= Math.PI * 2;
      if (diff < -Math.PI) diff += Math.PI * 2;

      // Update the angle
      controls.azimuthAngle = targetAzimuth - diff;
    }

    // setLookAt(posX, posY, posZ, targetX, targetY, targetZ, enableTransition)
    // The smooth transition automatically handles the interruption if the user clicks another photo mid-motion
    controlsRef.current.setLookAt(
      preset.position[0], preset.position[1], preset.position[2],
      preset.target[0], preset.target[1], preset.target[2],
      enableTransition
    );

    invalidate();

    isInitialRender.current = false;

  }, [activePresetId, controlsRef, camera, clock, invalidate]);

  return null;
}