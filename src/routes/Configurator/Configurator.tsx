import React from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { vehicleRegistry } from '../../config/vehicles';
import { useConfiguratorStore } from '../../store/configuratorStore';
import MemoryTestBox from '../../scene/MemoryTestBox';

const Configurator: React.FC = () => {
  //FIRST TO DO WHEN COMPONENT MOUNT 
  const { vehicleId } = useParams<{ vehicleId: string }>(); //Get the vehicleID from the URL params. In the router we specified :vehicleID as a dynamic segment

  const config = vehicleId ? vehicleRegistry[vehicleId] : null; //Get the vehicle configuration if vehicleId is not null
  
  //CURRENT STATE
  const currentColor = useConfiguratorStore((state) => state.carColor);
  // currentWheel
  // currentMaterial (for specific parts of the car)
  // Etc...

  //ACTIONS
  const setCarColor = useConfiguratorStore((state) => state.setCarColor);
  //setWheels
  //Set material to specific part of the car
  //Etc...

  if (!config) {
    return <div>Vehicle not found in the registry.</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Canvas WebGL 3D Scene */}
      <div style={{ flex: 1, position: 'relative', height: '100%', overflow: 'hidden' }}>
        <Canvas
          gl={{ 
            antialias: true, 
            preserveDrawingBuffer: false,
            powerPreference: "high-performance" 
          }}
          camera={{ position: [0, 0, 4], fov: 45 }}
        >
          {/* Only for development purposes */}
          <Perf position="top-left" minimal={false} /> 

          {/* TO SUBSTITUTE WITH HIGH QUALITY HDR MAP */}
          <ambientLight intensity={0.7} /> 
          <pointLight position={[10, 10, 10]} intensity={1.5} />

          {/* Stress test */}
          <MemoryTestBox />
        </Canvas>
      </div>

      {/* Pannello UI del Configuratore */}
      <aside style={{ width: '300px', padding: '2rem', backgroundColor: '#f5f5f5', borderLeft: '1px solid #ddd' }}>
        <h3>Paint Options</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '1rem' }}>
          {config.paintOptions.map((paint) => (
            <button
              key={paint.hex}
              onClick={() => setCarColor(paint.hex)}
              title={paint.name}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: paint.hex,
                border: currentColor === paint.hex ? '3px solid #000' : '2px solid transparent',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Configurator;