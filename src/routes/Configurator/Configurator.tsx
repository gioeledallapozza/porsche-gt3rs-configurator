import React, { Suspense, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Perf } from 'r3f-perf';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, OrbitControls } from '@react-three/drei';
import { vehicleRegistry } from '@/config/vehicles';
import Vehicle from '@/scene/vehicle/Vehicle';
import styles from './Configurator.module.css';

//Smart Sections
import ExteriorColorSection from './components/sections/ExteriorColorSection.tsx';
import AeroPackageSection from './components/sections/AeroPackageSection.tsx';

const Configurator: React.FC = () => {

  const { vehicleId } = useParams<{ vehicleId: string }>(); //Get the vehicleID from the URL params. In the router we specified :vehicleID as a dynamic segment
  const config = vehicleId ? vehicleRegistry[vehicleId] : null; //Get the vehicle configuration if vehicleId is not null

  const [contextLost, setContextLost] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleWebGlContextLost = useCallback(() => {
    console.warn('WebGL context was lost, attempting recovery...');
    setContextLost(true);
  }, []);

  const handleWebGlContextRestored = useCallback(() => {
    console.log('WebGL context restored');
    setContextLost(false);
  }, []);

  if (!config) {
    return <div style={{ color: '#fff', padding: '2rem' }}>Vehicle not found in the registry.</div>;
  }

  if (contextLost) {
    return (
      <div className={`${styles.configuratorContainer} animate-entry`}>
        <div className={styles.canvasWrapper}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#fff',
            gap: '1rem'
          }}>
            <div>WebGL Context Lost - Reloading...</div>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.5rem 1rem',
                background: '#ff6b6b',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
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
          <Suspense>
            <Environment preset="studio" environmentIntensity={1.0} background/>
          </Suspense>
          {/* <ambientLight intensity={1.5} /> 
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#8888ff" /> */}

          {/* <Environment preset="studio" />  */}
          {/* Aggiunge realismo a terra senza pesanti luci dinamiche */}
          {/* <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={5} /> */}

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
        {/* Isolated Subscriptions: Zero impact on Canvas performance */}
        <ExteriorColorSection options={config.paintOptions} />
        
        {config.aeroOptions && (
          <AeroPackageSection options={config.aeroOptions} />
        )}

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