import React, { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { cameraPresets } from '@/config/camera/cameraPresets';


interface CameraTransitionManagerProps {
  controlsRef: React.MutableRefObject<CameraControls | null>;
}

// Duration of the black screen fade (must match the CSS transition duration in the overlay)
const FADE_DURATION = 700; 

/* eslint-disable react-hooks/immutability */
export default function CameraTransitionManager({ controlsRef }: CameraTransitionManagerProps) {
  // Logical preset requested by the user
  const activePresetId = useConfiguratorStore((state) => state.activeCameraPreset);
  
  // Actions to trigger the UI overlay and update the actually rendered preset
  const setCameraTransitioning = useConfiguratorStore((state) => state.setCameraTransitioning);
  const setRenderedCameraPreset = useConfiguratorStore((state) => state.setRenderedCameraPreset);

  const isInitialRender = useRef(true);
  const targetFovRef = useRef(35);
  const prevIsInterior = useRef(false);

  const { camera, clock, invalidate } = useThree();

  // Smooth FOV Damping
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
    
    // Check if the target preset is an interior view
    const isInterior = preset.id.toLowerCase().includes('interior');

    clock.getDelta();

    const updateControlsLimits = () => {
      controls.minDistance = preset.minDistance ?? 3.5;
      controls.maxDistance = preset.maxDistance ?? 8.0;
      controls.minPolarAngle = preset.minPolarAngle ?? 0;
      controls.maxPolarAngle = preset.maxPolarAngle ?? (Math.PI / 2 - 0.05);
      controls.minAzimuthAngle = preset.minAzimuthAngle ?? -Infinity;
      controls.maxAzimuthAngle = preset.maxAzimuthAngle ?? Infinity;
    };

    // Are we crossing the threshold between exterior and interior (or vice versa)?
    const isCrossingThreshold = !isInitialRender.current && (prevIsInterior.current !== isInterior);
  
   if (isCrossingThreshold) {
      // Lower the black screen curtain (UI overlay)
      setCameraTransitioning(true);

      // Wait for the screen to be COMPLETELY BLACK before moving anything
      setTimeout(() => {
        updateControlsLimits();

        // Update FOV instantly while in the dark
        const newFov = preset.fov ?? 35;
        targetFovRef.current = newFov;

        // Teleport camera without animation
        controls.setLookAt(
          preset.position[0], preset.position[1], preset.position[2],
          preset.target[0], preset.target[1], preset.target[2],
          false 
        );

        const perspectiveCamera = camera as THREE.PerspectiveCamera;
        perspectiveCamera.fov = newFov;
        perspectiveCamera.updateProjectionMatrix();

        // CRITICAL: Now that the screen is black, notify the rest of the scene 
        // (Lights, Hotspots) to update their visual state.
        setRenderedCameraPreset(preset.id);

        invalidate();
        
        // Short pause to ensure React and Three.js have rendered the new frame (lights/shaders)
        requestAnimationFrame(() => {
          setTimeout(() => {
             // Raise the curtain
             setCameraTransitioning(false); 

             invalidate();
          }, 50); 
        });
      }, FADE_DURATION);

    } else {
      // NORMAL TRANSITION (No threshold crossed)
      updateControlsLimits();
      targetFovRef.current = preset.fov ?? 35;

      if (enableTransition) {
        // Calculate shortest path for smooth azimuth rotation
        const targetAzimuth = Math.atan2(
          preset.position[0] - preset.target[0],
          preset.position[2] - preset.target[2]
        );
        const currentAzimuth = controls.azimuthAngle;

        let diff = (targetAzimuth - currentAzimuth) % (Math.PI * 2);
        if (diff > Math.PI) diff -= Math.PI * 2;
        if (diff < -Math.PI) diff += Math.PI * 2;

        controls.azimuthAngle = targetAzimuth - diff;
      }

      controls.setLookAt(
        preset.position[0], preset.position[1], preset.position[2],
        preset.target[0], preset.target[1], preset.target[2],
        enableTransition
      );

      // Immediately notify the scene of the new preset since there is no black screen
      setRenderedCameraPreset(preset.id);
    }

    invalidate();
    
    // Update refs for the next cycle
    isInitialRender.current = false;
    prevIsInterior.current = isInterior;

  }, [activePresetId, controlsRef, camera, clock, invalidate, setCameraTransitioning, setRenderedCameraPreset]);

  return null; // Logic-only component, renders nothing directly to the DOM/Canvas
}