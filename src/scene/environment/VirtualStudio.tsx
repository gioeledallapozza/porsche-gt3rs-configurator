import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';

const VirtualStudio: React.FC = () => {
  return (
   <Environment frames={1} resolution={1024} background={false}>
      {/* Ceiling softbox (Key Light) - Creates the continuous reflection on the hood and roof */}
      <Lightformer 
        intensity={3} 
        rotation-x={Math.PI / 2} 
        position={[0, 5, -2]} 
        scale={[12, 10, 1]} 
      />
      
      {/* Side softboxes – Define the doors and broad shoulders of the GT3 RS */}
      <Lightformer 
        intensity={1.5} 
        rotation-y={Math.PI / 2} 
        position={[-6, 1, 0]} 
        scale={[20, 2, 1]} 
      />
      <Lightformer 
        intensity={1.5} 
        rotation-y={-Math.PI / 2} 
        position={[6, 1, 0]} 
        scale={[20, 2, 1]} 
      />
      
      {/* Front fill light - Illuminates the front air intakes and the splitter */}
      <Lightformer 
        intensity={2} 
        rotation-y={Math.PI} 
        position={[0, 1, 8]} 
        scale={[10, 2, 1]} 
      />
    </Environment>
  );
};

export default VirtualStudio;