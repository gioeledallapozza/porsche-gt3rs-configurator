import React, { useState, useEffect } from 'react';
import { useKtx2Disposal } from '../hooks/useKtx2Disposal';

// Dummy targeting array to activate the high-frequency pipeline
const CARBON_SETS = [
  {
    id: 'v1_ambientcg',
    color: '/textures/materials/carbon/carbon_twill_v1_color_1k.ktx2',
    normal: '/textures/materials/carbon/carbon_twill_v1_normal_1k.ktx2'
  },
  {
    id: 'v2_sharetextures',
    color: '/textures/materials/carbon/carbon_twill_v2_color_1k.ktx2',
    normal: '/textures/materials/carbon/carbon_twill_v2_normal_1k.ktx2'
  },
  {
    id: 'v3_texturecan',
    color: '/textures/materials/carbon/carbon_twill_v3_color_1k.ktx2',
    normal: '/textures/materials/carbon/carbon_twill_v3_normal_1k.ktx2'
  }
];

const MemoryTestBox: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    // Stress test
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % CARBON_SETS.length);
    }, 150); 

    return () => clearInterval(intervalId);
  }, []); //Only first render

  const activeSet = CARBON_SETS[index];

  const colorMap = useKtx2Disposal(activeSet.color);
  const normalMap = useKtx2Disposal(activeSet.normal);

  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      {colorMap && normalMap ? (
        <meshPhysicalMaterial 
          map={colorMap} 
          normalMap={normalMap}
          roughness={0.7}             // Fibra opaca sotto la resina
          clearcoat={1.0}             // Resina epossidica
          clearcoatRoughness={0.05}   // Superficie esterna lucidata
          metalness={0.0}             // Il carbonio non è metallico
        />
      ) : (
        // fallback material while the texture is loading or if there's an error
        <meshBasicMaterial color="#ff0000" wireframe />
      )}
    </mesh>
  );
};

export default MemoryTestBox;