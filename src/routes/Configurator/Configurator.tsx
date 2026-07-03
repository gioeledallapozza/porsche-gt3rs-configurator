import React from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { vehicleRegistry } from '../../config/vehicles';
import { useConfiguratorStore } from '../../store/configuratorStore';
import MemoryTestBox from '../../scene/MemoryTestBox'; //TO REMOVE
import styles from './Configurator.module.css';

const Configurator: React.FC = () => {
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
    return <div style={{ color: '#fff', padding: '2rem' }}>Vehicle not found in the registry.</div>;
  }

  return (
    <div className={styles.configuratorContainer}>

      {/* Canvas WebGL 3D Scene */}
      <div className={styles.canvasWrapper}>
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

      {/* Configurator UI pannel */}
      <aside className={styles.uiPanel}>
        <h3 className={styles.panelTitle}>Exterior Paint</h3>
        <div className={styles.colorPickerGrid}>
          {config.paintOptions.map((paint) => (
            <button
              key={paint.hex}
              onClick={() => setCarColor(paint.hex)}
              title={paint.name}
              className={`${styles.colorButton} ${currentColor === paint.hex ? styles.active : ''}`}
              style={{ backgroundColor: paint.hex }}
              aria-label={`Select ${paint.name} paint`}
            />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Configurator;