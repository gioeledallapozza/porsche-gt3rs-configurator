import React, { Suspense, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three'
import { Perf } from 'r3f-perf';
import { Canvas, invalidate } from '@react-three/fiber';
import { CameraControls, Html, SoftShadows } from '@react-three/drei';
import { vehicleRegistry } from '@/config/vehicles';
import Vehicle from '@/scene/vehicle/Vehicle';
import VirtualStudio from '@/scene/environment/VirtualStudio.tsx';
import StudioLighting from '@/scene/environment/StudioLighting.tsx';
import styles from './Configurator.module.css';

//Smart Sections
import ExteriorColorSection from './components/sections/ExteriorColorSection.tsx';
import AeroPackageSection from './components/sections/AeroPackageSection.tsx';

const Configurator: React.FC = () => {

  const { vehicleId } = useParams<{ vehicleId: string }>(); //Get the vehicleID from the URL params. In the router we specified :vehicleID as a dynamic segment
  const config = vehicleId ? vehicleRegistry[vehicleId] : null; //Get the vehicle configuration if vehicleId is not null
  const cameraControlsRef = useRef<React.ElementRef<typeof CameraControls>>(null);

  //Setup invalidation for frameloop=demand
  useEffect(() => {
    const controls = cameraControlsRef.current;
    if (!controls) return;

    // Invalidate scene forcing update
    const onUpdate = () => invalidate();
    
    controls.addEventListener('update', onUpdate);

    return () => {
      controls.removeEventListener('update', onUpdate);
    };
  }, []);

  if (!config) {
    return <div style={{ color: '#fff', padding: '2rem' }}>Vehicle not found in the registry.</div>;
  }

  return (
    <div className={`${styles.configuratorContainer} animate-entry`}>

      {/* Canvas WebGL 3D Scene */}
      <div className={styles.canvasWrapper}>
        <Canvas
          shadows={{ type: THREE.PCFShadowMap }}
          frameloop="demand" //Only render when there are changes in the scene
          dpr={[1, 1.5]}
          gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.0,
            alpha: true,
          }}
          camera={{ position: [3.5, 1.5, 4.5], fov: 35 }}
        >
          {/* Only for development purposes */}
          <Perf position="top-left" minimal={false} />

          <SoftShadows focus={0.5} samples={16} size={12}/>

          <Suspense fallback={
            <Html center>
              <div className={styles.vehicleLoader}>Loading 3D Assets...</div>
            </Html>
          }>
            <VirtualStudio />  {/* EnvMap */}
            <StudioLighting /> {/* Dynamic shadows */}

            <Vehicle vehicleId={config.id} />
          </Suspense>

          {/* Camera control for better integraton with moving camera */}
          <CameraControls 
            ref={cameraControlsRef}
            makeDefault 
            minDistance={3.5} 
            maxDistance={8} 
            maxPolarAngle={Math.PI / 2 - 0.05}
            azimuthRotateSpeed={0.25}
            polarRotateSpeed={0.25}
            smoothTime={0.35}
            draggingSmoothTime={0.20}
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

        {/* TO CHANGE AND INTEGRATE */}
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