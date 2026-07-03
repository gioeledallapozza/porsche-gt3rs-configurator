import React from 'react';

interface PorscheGT3RSProps {
  carColor: string;
}

const PorscheGT3RS: React.FC<PorscheGT3RSProps> = ({ carColor }) => {

  return (
    <group position={[0, -0.5, 0]}>
      {/* Car Body (Aerodynamic placeholder) */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.6, 4.2]} />
        <meshPhysicalMaterial 
          color={carColor} 
          roughness={0.15} 
          metalness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Cockpit (Placeholder) */}
      <mesh position={[0, 0.9, -0.2]} castShadow>
        <boxGeometry args={[1.4, 0.4, 1.8]} />
        <meshStandardMaterial color="#111111" roughness={0.1} />
      </mesh>

      {/* Rear Wing (Placeholder) */}
      <mesh position={[0, 1.0, 1.8]} castShadow>
        <boxGeometry args={[1.8, 0.05, 0.4]} />
        <meshStandardMaterial color="#050505" roughness={0.8} />
      </mesh>
    </group>
  );
};

export default PorscheGT3RS;