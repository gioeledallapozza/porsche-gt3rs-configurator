import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';

const VirtualStudio: React.FC = () => {
  return (
    <Environment resolution={2048} background={false} >
      
      {/* ROOM BASE */}
      <Lightformer 
        form="sphere" 
        intensity={0.1} 
        color="#111" 
        scale={100} 
      />

      {/* TOP SOFTBOX */}
      <Lightformer 
        form="rect" 
        intensity={1.5} 
        position={[0, 5, 0]} 
        rotation-x={Math.PI / 2} 
        scale={[10, 10, 1]} 
      />

      {/* SIDE BLADES */}
      <Lightformer 
        form="rect" 
        intensity={1.5} 
        position={[-4, 1.5, 0]} 
        rotation-y={Math.PI / 2} 
        scale={[15, 1.5, 1]} 
      />
      <Lightformer 
        form="rect" 
        intensity={0.6} 
        position={[4, 1.5, 0]} 
        rotation-y={-Math.PI / 2} 
        scale={[15, 1.5, 1]} 
      />

      {/* FRONT KICK */}
      <Lightformer 
        form="circle" 
        intensity={1.0} 
        position={[0, 1.5, 6]}
        rotation-y={Math.PI} 
        scale={[5, 5, 1]} 
      />
      
    </Environment>
  );
};

export default VirtualStudio;