import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

const StudioLighting: React.FC = () => {
  const dirLightRef = useRef<THREE.DirectionalLight>(null!);
  const { scene } = useThree();

  useEffect(() => {
    if (dirLightRef.current) {
    
      dirLightRef.current.updateMatrixWorld();
      
      const shadowHelper = new THREE.CameraHelper(dirLightRef.current.shadow.camera);
      scene.add(shadowHelper);

      // invalidate();

      return () => {
        scene.remove(shadowHelper);
        shadowHelper.dispose();
      };
    }
  }, [scene]);

  return (
    <group>
      <directionalLight
        // ref={dirLightRef} // ONLY FOR DEBUG
        castShadow
        position={[5, 8, 3]}
        intensity={0.5} 
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
        shadow-normalBias={0.04}
      >
        <orthographicCamera attach="shadow-camera" args={[-2.5, 2.5, 2.5, -2.5, 0.5, 12]} />
      </directionalLight>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]} receiveShadow> 
        <planeGeometry args={[30, 30]} /> 
        <shadowMaterial transparent opacity={0.6} color="#000000" />
      </mesh>
    </group>
  );
};

export default StudioLighting;