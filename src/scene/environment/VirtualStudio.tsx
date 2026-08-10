import React, { useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { EXRLoader } from 'three-stdlib';
import * as THREE from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

/* eslint-disable react-hooks/immutability */
const VirtualStudio: React.FC = () => {
  const texture = useLoader(EXRLoader, '/hdri/studio_prebaked.exr');
  const { scene } = useThree();
  const setEnvReady = useConfiguratorStore((state) => state.setEnvReady);

  useEffect(() => {
    // Tell three.js that is a PMREM pre-calculated
    texture.mapping = THREE.CubeUVReflectionMapping;
    
    scene.environment = texture;
    setEnvReady(true);
    
    return () => {
      scene.environment = null;
      setEnvReady(false);
    };
  }, [texture, scene, setEnvReady]);

  return null;
};

// Il preload garantisce che il browser inizi il fetch prima del render
useLoader.preload(EXRLoader, '/hdri/studio_prebaked.exr');

export default VirtualStudio;