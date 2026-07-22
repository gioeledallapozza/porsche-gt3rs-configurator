import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { useLevaStore } from '@/store/levaStore';

const VirtualStudio: React.FC = () => {
  const environment = useLevaStore((state) => state.environment);
  
  return (
    <Environment resolution={2048} background={false}>
      
      {/* <color attach="background" args={['#0f26f1']} /> */}

      {/* ROOM BASE */}
      <Lightformer 
        form="rect" 
        intensity={environment.envIntensity} 
        color="#ffffff" 
        scale={environment.envScale} 
        position={[0, 20, 0]} 
        rotation-x={Math.PI / 2}
      />

      {/* TOP SOFTBOX */}
      <Lightformer 
        form="rect" 
        intensity={environment.lightformerTop}
        position={[0, 5, 0]} 
        rotation-x={Math.PI / 2} 
        scale={[environment.lightformerTopScale, environment.lightformerTopScale, 1]} 
      />

      {/* SIDE BLADES */}
      <Lightformer 
        form="rect" 
        intensity={environment.lightformerSide}
        position={[-5, 2, 0]} 
        rotation-y={Math.PI / 2} 
        scale={[environment.lightformerSideScale, 3, 1]} 
      />
      <Lightformer 
        form="rect" 
        intensity={environment.lightformerSide} 
        position={[5, 2, 0]} 
        rotation-y={-Math.PI / 2} 
        scale={[environment.lightformerSideScale, 3, 1]} 
      />

      {/* FRONT KICK */}
      <Lightformer 
        form="rect" 
        intensity={environment.lightformerFront} 
        position={[0, 1.5, 5]}
        rotation-y={Math.PI} 
        scale={[environment.lightformerFrontScale, 0.5, 1]} 
      />

      {/* REAR KICK */}
      <Lightformer 
        form="rect"
        intensity={environment.lightformerRear}
        position={[0, 1.5, -5]}
        scale={[environment.lightformerRearScale, 0.5, 1]}
      />
      
    </Environment>
  );
};

export default VirtualStudio;