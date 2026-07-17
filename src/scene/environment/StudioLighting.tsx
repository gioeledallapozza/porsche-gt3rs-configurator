import React, { useRef, useState, useEffect } from 'react';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const StudioLighting: React.FC = () => {
  
  // 1. Decommentato lo stato correttamente
  const lightRef = useRef<THREE.SpotLight>(null!);
  const [shadowCam, setShadowCam] = useState<THREE.Camera | null>(null);

  // Forza l'aggiornamento finché la camera d'ombra non è pronta
  useFrame(() => {
    if (!shadowCam && lightRef.current?.shadow?.camera) {
      setShadowCam(lightRef.current.shadow.camera);
    }
  });

  useHelper(lightRef, THREE.SpotLightHelper, 'cyan');
  useHelper(shadowCam as any, THREE.CameraHelper);
  return (
    <group>
      <ambientLight intensity={0.5} />
     <spotLight
        ref={lightRef}
        position={[2, 15, 2]} // Leggermente spostata per creare una proiezione diagonale
        angle={0.6}
        penumbra={1}
        castShadow
        intensity={2}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        shadow-normalBias={0.02} // Ridotto leggermente
        shadow-camera-near={5}
        shadow-camera-far={25}
        shadow-camera-fov={20}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial transparent opacity={0.6} color="#000000" />
      </mesh>
    </group>
  );
};

export default StudioLighting;