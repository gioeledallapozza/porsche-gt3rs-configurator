import React, { useEffect } from 'react';
import { CameraControls } from '@react-three/drei';
import * as THREE from 'three';

interface CameraDebugHelperProps {
  controlsRef: React.MutableRefObject<CameraControls | null>;
}

export default function CameraDebugHelper({ controlsRef }: CameraDebugHelperProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      //Press C to print camera position and target
      if (e.key.toLowerCase() === 'c' && controlsRef.current) {
        const position = new THREE.Vector3();
        const target = new THREE.Vector3();

        controlsRef.current.getPosition(position);
        controlsRef.current.getTarget(target);

        console.log(`
            ======== CAMERA PRESET DATA ========
            position: [${position.x.toFixed(3)}, ${position.y.toFixed(3)}, ${position.z.toFixed(3)}],
            target: [${target.x.toFixed(3)}, ${target.y.toFixed(3)}, ${target.z.toFixed(3)}]
            ====================================
        `);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [controlsRef]);

  return null;
}