import { Html } from '@react-three/drei';
import { useFrame, useThree, invalidate } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

type HotspotAction = 'toggleDoors' | 'toggleHood' | 'toggleSteering';

const HOTSPOTS_BASE: Array<{ id: string; pos: THREE.Vector3; actionName: HotspotAction }> = [
  { id: 'door_l', pos: new THREE.Vector3(0.9, 0.6, 0.2), actionName: 'toggleDoors' },
  { id: 'door_r', pos: new THREE.Vector3(-0.9, 0.6, 0.2), actionName: 'toggleDoors' },
  { id: 'hood', pos: new THREE.Vector3(0, 0.7, 1.8), actionName: 'toggleHood' },
  { id: 'wheel_fl', pos: new THREE.Vector3(-0.9, 0.4, 1.2), actionName: 'toggleSteering' },
  { id: 'wheel_fr', pos: new THREE.Vector3(0.9, 0.4, 1.2), actionName: 'toggleSteering' },
];

//HOTPOTINS CONST
const HOTSPOTS = HOTSPOTS_BASE.map((hp) => ({
  ...hp,
  // Calculation of the radial normal (outward direction)
  normal: hp.pos.clone().setY(0).normalize(),
}));

const VEC_ZERO = new THREE.Vector3();

export default function Gt3rsHotspots() {
  const { camera } = useThree();

  const htmlRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lastCamPos = useRef(new THREE.Vector3());
  const movementTimer = useRef<number>(0);
  const isMoving = useRef(false);

  // Helper for applying styles to DOM nodes in batches
  const applyToAll = (opacity: number, transform: string, pointerEvents: string) => {
    htmlRefs.current.forEach((el) => {
      if (el) {
        el.style.opacity = opacity.toString();
        el.style.transform = transform;
        el.style.pointerEvents = pointerEvents;
      }
    });
  };

  // Initialize camera
  useEffect(() => {
    lastCamPos.current.copy(camera.position);
  }, [camera]);
  

  // CORE LOGIC: Frameloop high performance
  useFrame((state, delta) => {
    // Read live at every frame, never cached: no re-renders, no stale state
    const { renderedCameraPreset, isCameraTransitioning } = useConfiguratorStore.getState();
    const isInterior = renderedCameraPreset === 'interior_view';
    const isTransitioning = isCameraTransitioning;

    // Conditional selector to ruthlessly disable everything
    if (isInterior || isTransitioning) {
      applyToAll(0, 'scale(0)', 'none');
      lastCamPos.current.copy(state.camera.position);
      return;
    }

    const distMoved = lastCamPos.current.distanceToSquared(state.camera.position);

    // Movement Management
    if (distMoved > 0.0001) { // 0.0001 for the squared distance is an excellent tolerance
      if (!isMoving.current) {
        isMoving.current = true;
        applyToAll(0, 'scale(0)', 'none');
      }
      movementTimer.current = 0;
    } else if (isMoving.current) {
      movementTimer.current += delta;

      invalidate(); // Force refresh

      // Reappearance delay(400ms = 0.4s)
      if (movementTimer.current > 0.4) {
        isMoving.current = false;
      }
    }

    // If the camera is stationary, we perform the vector calculations for occlusion
    if (!isMoving.current) {
      const camPos = state.camera.position;

      HOTSPOTS.forEach((hotspot, i) => {
        const el = htmlRefs.current[i];
        if (!el) return;

        // View vector: from the hotspot position towards the camera
        const viewVector = VEC_ZERO.subVectors(camPos, hotspot.pos).normalize();

        // Dot product to check if the hotspot is facing us
        const dot = viewVector.dot(hotspot.normal);

        // Threshold to 0.4
        if (dot > 0.4) {
          el.style.opacity = '1';
          el.style.transform = 'scale(1)';
          el.style.pointerEvents = 'auto';
        } else {
          el.style.opacity = '0';
          el.style.transform = 'scale(0)';
          el.style.pointerEvents = 'none';
        }
      });
    }

    lastCamPos.current.copy(state.camera.position);
  });

  // CSS STYLE
  const getInitialStyle = (): React.CSSProperties => ({
    width: '24px', height: '24px', borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', border: '2px solid rgba(255, 255, 255, 0.8)',
    cursor: 'pointer', backdropFilter: 'blur(4px)',
    opacity: 0, transform: 'scale(0)', pointerEvents: 'none',
    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease, background-color 0.2s',
  });

  const handleClick = (e: React.MouseEvent, actionName: HotspotAction) => {
    e.stopPropagation();
    useConfiguratorStore.getState()[actionName]();
  };

  return (
    <group>
      {HOTSPOTS.map((hotspot, i) => (
        <Html key={hotspot.id} position={hotspot.pos} center zIndexRange={[100, 0]}>
          <div
            ref={(el) => { htmlRefs.current[i] = el; }}
            style={getInitialStyle()}
            onClick={(e) => handleClick(e, hotspot.actionName)}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          />
        </Html>
      ))}
    </group>
  );
}