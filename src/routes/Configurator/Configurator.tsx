import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Perf } from 'r3f-perf';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { vehicleRegistry } from '../../config/vehicles';
import styles from './Configurator.module.css';
import Vehicle from '../../scene/vehicle/Vehicle';
import ExteriorColorPicker from './components/ExteriorColorPicker';

const Configurator: React.FC = () => {

  const { vehicleId } = useParams<{ vehicleId: string }>(); //Get the vehicleID from the URL params. In the router we specified :vehicleID as a dynamic segment
  const config = vehicleId ? vehicleRegistry[vehicleId] : null; //Get the vehicle configuration if vehicleId is not null

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
          camera={{ position: [3.5, 1.5, 4.5], fov: 35 }}
        >
          {/* Only for development purposes */}
          <Perf position="top-left" minimal={false} /> 

          {/* TO SUBSTITUTE WITH HIGH QUALITY HDR MAP */}
          <ambientLight intensity={1.5} /> 
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#8888ff" />

          <Suspense fallback={
            <Html center>
              <div className={styles.vehicleLoader}>
                Loading vehicle assets...
              </div>
            </Html>
          }>
            {/* Iniezione della prop nel Router */}
            <Vehicle vehicleId={config.id} />
          </Suspense>

          {/* makeDefault is a must for ondemand canvas */}
          <OrbitControls 
            makeDefault 
            enablePan={false} 
            enableDamping={true}
            minDistance={3} 
            maxDistance={10} 
            maxPolarAngle={Math.PI / 2 - 0.05} // Always over the ground
            rotateSpeed={0.4}
            zoomSpeed={0.6}
          />
        </Canvas>
      </div>

      {/* Configurator UI pannel */}
     <aside className={styles.uiPanel}>
        <ExteriorColorPicker paintOptions={config.paintOptions} />

        {/* IN FUTURE one component for each possible sections */}
        <div className={styles.accordionSection}>
          <h3 className={styles.panelTitle} style={{ opacity: 0.5 }}>
            Wheels and Rims <span>▼</span>
          </h3>
        </div>
      </aside>
    </div>
  );
};

export default Configurator;