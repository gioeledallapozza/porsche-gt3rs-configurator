import { Html } from '@react-three/drei';
import { useFrame, invalidate } from '@react-three/fiber';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

export default function Gt3rsHotspots() {
  const { toggleDoors, toggleHood, toggleSteering } = useConfiguratorStore();

  const [isVisible, setIsVisible] = useState(true);
  const lastCamPos = useRef(new THREE.Vector3());
  const isMoving = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const proxyRef = useRef<THREE.Mesh>(null!);
  
  // The state that triggers HTML rendering only when the ref is populated.
  const [isReady, setIsReady] = useState(false);

  // Stable array to avoid infinite Drei re-renders
  const colliders = useMemo(() => [proxyRef], []);

  // Callback Ref: triggers exactly when Three.js mounts the mesh.
  const handleMeshMount = useCallback((node: THREE.Mesh) => {
    if (node) {
      proxyRef.current = node; 
      node.updateMatrixWorld(true); 
      setIsReady(true); 
      invalidate(); 
    }
  }, []);

  // LOOP TO DETERMINATE IF THE HOTPOINT IS VISIBLE OR NOT
  useFrame((state) => {

    //If the vector is 0,0,0 initialize the position of the camera correctly
    if (lastCamPos.current.lengthSq() === 0) {
      lastCamPos.current.copy(state.camera.position);
      return;
    }

    const delta = lastCamPos.current.distanceTo(state.camera.position);

    if (delta > 0.005) { 
      if (!isMoving.current) {
        isMoving.current = true;
        setIsVisible(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    } else { 
      if (isMoving.current) {
        isMoving.current = false;
        timeoutRef.current = setTimeout(() => setIsVisible(true), 400);
      }
    }
    lastCamPos.current.copy(state.camera.position);
  });
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Style of the hotpoint
  const getHotspotStyle = (visible: boolean): React.CSSProperties => ({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    cursor: visible ? 'pointer' : 'default',
    backdropFilter: 'blur(4px)',
    pointerEvents: visible ? 'auto' : 'none',
    transform: visible ? 'scale(1)' : 'scale(0)',
    opacity: visible ? 1 : 0,
    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease, background-color 0.2s',
  });

  //Handle click
  const handleClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation(); 
    action();
  };

  return (
    <group>
      {/* Use the callback to intercept the mesh on the fly. */}
      <mesh ref={handleMeshMount} position={[0, 0.7, 0]}>
        <boxGeometry args={[1.7, 1.0, 3.4]} />
        <meshBasicMaterial colorWrite={false} depthWrite={false} wireframe={false} />
      </mesh>
      
      {/* Render the HTML ONLY when we are sure the Ref is ready. */}
      {isReady && (
        <>
          {/* LEFT DOOR */}
          <Html position={[0.9, 0.6, 0.2]} center occlude={colliders}>
            <div 
              style={getHotspotStyle(isVisible)} 
              onClick={(e) => handleClick(e, toggleDoors)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            />
          </Html>

          {/* RIGHT DOOR */}
          <Html position={[-0.9, 0.6, 0.2]} center occlude={colliders}>
            <div 
              style={getHotspotStyle(isVisible)} 
              onClick={(e) => handleClick(e, toggleDoors)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            />
          </Html>
          
          {/* HOOD */}
          <Html position={[0, 0.7, 1.8]} center occlude={colliders}>
            <div 
              style={getHotspotStyle(isVisible)} 
              onClick={(e) => handleClick(e, toggleHood)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            />
          </Html>

          {/* WHEEL Left-Front */}
          <Html position={[-0.9, 0.4, 1.2]} center occlude={colliders}>
            <div 
              style={getHotspotStyle(isVisible)} 
              onClick={(e) => handleClick(e, toggleSteering)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            />
          </Html>

          {/* WHEEL Right-Front */}
          <Html position={[0.9, 0.4, 1.2]} center occlude={colliders}>
            <div 
              style={getHotspotStyle(isVisible)} 
              onClick={(e) => handleClick(e, toggleSteering)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            />
          </Html>
        </>
      )}
    </group>
  );
}