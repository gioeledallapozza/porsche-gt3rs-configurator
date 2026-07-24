import React, { Suspense, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three'
// import { Perf } from 'r3f-perf';
import { Canvas, invalidate } from '@react-three/fiber';
import { CameraControls, Html } from '@react-three/drei';
// import { EffectComposer } from '@react-three/postprocessing';
// import { SSAO } from '@react-three/postprocessing';
import { vehicleRegistry } from '@/config/vehicles';
import Vehicle from '@/scene/vehicle/Vehicle';
import VirtualStudio from '@/scene/environment/VirtualStudio.tsx';
import StudioLighting from '@/scene/environment/StudioLighting.tsx';
import styles from '@/routes/Configurator/components/layout/Configurator.module.css';

//Smart Sections
import ExteriorColorSection from './components/sections/ExteriorColorSection.tsx';
import AeroPackageSection from './components/sections/AeroPackageSection.tsx';
import WheelColorSection from './components/sections/WheelColorSection.tsx';
import CaliperColorSection from './components/sections/CaliperColorSection.tsx';
import { LevaControllers } from '@/components/LevaControllers.tsx';


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
        {/* SOCIAL LINKS OVERLAY */}
        <div className={styles.socialLinksOverlay}>
          <a 
            href="https://github.com/gioeledallapozza" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialButton}
            aria-label="GitHub Profile"
          >
            {/* GitHub SVG Icon */}
            <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          
          <a 
            href="https://twitter.com/DallaPozzaG" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialButton}
            aria-label="X Profile"
          >
            {/* X (Twitter) SVG Icon */}
            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>

        <Canvas
          shadows={{ type: THREE.PCFSoftShadowMap }}
          frameloop="demand" //Only render when there are changes in the scene
          dpr={[1, 1.5]}
          gl={{ 
            antialias: true, 
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.0,
            alpha: true,
          }}
          camera={{ position: [3.5, 1.5, 4.5], fov: 15 }}
        >
          {/* Only for development purposes */}
          {/* <Perf position="top-left" minimal={false} /> */}

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
            draggingSmoothTime={0.40}
          />

          {/* <EffectComposer enableNormalPass={true}>
            <SSAO 
                radius={0.3} 
                intensity={1.5} 
                luminanceInfluence={0.4} 
                color={new THREE.Color('black')}
                bias={0.03} 
            />
          </EffectComposer> */}

          <LevaControllers />
        </Canvas>
      </div>

    {/* Configurator UI pannel */}
    <aside className={styles.uiPanel}>
        {/* Isolated Subscriptions: Zero impact on Canvas performance */}
        <ExteriorColorSection options={config.paintOptions} />
        
        {config.aeroOptions && (
          <AeroPackageSection options={config.aeroOptions} />
        )}

        {config.wheelOption && (
          <WheelColorSection options={config.wheelOption} />
        )}

        {config.caliperOptions && (
          <CaliperColorSection options={config.caliperOptions} />
        )}
      </aside>
    </div>
  );
};

export default Configurator;