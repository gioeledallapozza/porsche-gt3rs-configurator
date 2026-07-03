import React, { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Perf } from 'r3f-perf';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { vehicleRegistry } from '../../config/vehicles';
import { useConfiguratorStore } from '../../store/configuratorStore';
import styles from './Configurator.module.css';
import Vehicle from '../../scene/vehicle/Vehicle';

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

  //LOCAL STATE for accordion sections
  const [isColorSectionOpen, setIsColorSectionOpen] = useState(true);

  if (!config) {
    return <div style={{ color: '#fff', padding: '2rem' }}>Vehicle not found in the registry.</div>;
  }

  return (
    <div className={`${styles.configuratorContainer} animate-entry`}>

      {/* Canvas WebGL 3D Scene */}
      <div className={styles.canvasWrapper}>
        <Canvas
          frameloop="demand" //Only render when there are changes in the scene
          dpr={[1, 1.5]}
          gl={{ 
            antialias: true, 
            preserveDrawingBuffer: false,
            powerPreference: "high-performance"
          }}
          camera={{ position: [5, 2.5, 6], fov: 45 }}
        >
          {/* Only for development purposes */}
          <Perf position="top-left" minimal={false} /> 

          {/* TO SUBSTITUTE WITH HIGH QUALITY HDR MAP */}
          <ambientLight intensity={1.5} /> 
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#8888ff" />

          <Suspense 
            fallback={
              <Html center>
                <div className={styles.vehicleLoader}>
                  Loading vehicle assets...
                </div>
              </Html>
            }
          >
            <Vehicle />
          </Suspense>

          {/* makeDefault is a must for ondemand canvas */}
          <OrbitControls 
            makeDefault 
            enablePan={false} 
            enableDamping={false}
            minDistance={3} 
            maxDistance={10} 
            maxPolarAngle={Math.PI / 2 - 0.05} // Always over the ground
          />
        </Canvas>
      </div>

      {/* Configurator UI pannel */}
     <aside className={styles.uiPanel}>
        
        {/* Sezione Accordion: Colori Esterni */}
        <div className={styles.accordionSection}>
          <h3 
            className={styles.panelTitle} 
            onClick={() => setIsColorSectionOpen(!isColorSectionOpen)}
          >
            Exterior Colors
            {/* Semplice icona freccia basata sullo stato */}
            <span>{isColorSectionOpen ? '▲' : '▼'}</span>
          </h3>
          
          {/* Mostra la griglia solo se la sezione è aperta */}
          {isColorSectionOpen && (
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
          )}
        </div>

        {/* Accordion: Wheels */}
        <div className={styles.accordionSection}>
          <h3 className={styles.panelTitle} style={{ opacity: 0.5 }}>
            Wheels and Rims
            <span>▼</span>
          </h3>
          {/* Future content... */}
        </div>

      </aside>
    </div>
  );
};

export default Configurator;