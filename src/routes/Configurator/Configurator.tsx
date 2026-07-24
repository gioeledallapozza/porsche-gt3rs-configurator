import React, { Suspense, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three'
// import { Perf } from 'r3f-perf';
import { Canvas, invalidate } from '@react-three/fiber';
import { CameraControls, Html } from '@react-three/drei';
// import { EffectComposer } from '@react-three/postprocessing';
// import { SSAO } from '@react-three/postprocessing';

//Components
import { vehicleRegistry } from '@/config/vehicles';
import { cameraPresets } from '@/config/camera/cameraPresets';
import Vehicle from '@/scene/vehicle/Vehicle';
import VirtualStudio from '@/scene/environment/VirtualStudio.tsx';
import StudioLighting from '@/scene/environment/StudioLighting.tsx';
import CameraPresetsUI from './components/canvas/camera/CameraPresetsUI.tsx';
import CameraTransitionManager from '@/scene/camera/CameraTransitionManager';
import CameraDebugHelper from '@/scene/camera/CameraDebugHelper';
import SocialLinks from '@/routes/Configurator/components/canvas/overlay/SocialLinks.tsx';
// import LevaControllers from '@/components/LevaControllers.tsx';

//Css
import styles from '@/routes/Configurator/components/layout/Configurator.module.css';

//Smart Sections
import ConfiguratorSidebar from './components/layout/ConfiguratorSidebar.tsx';



const Configurator: React.FC = () => {

  const { vehicleId } = useParams<{ vehicleId: string }>(); //Get the vehicleID from the URL params. In the router we specified :vehicleID as a dynamic segment
  const config = vehicleId ? vehicleRegistry[vehicleId] : null; //Get the vehicle configuration if vehicleId is not null
  const cameraControlsRef = useRef<CameraControls | null>(null);

  const initialPreset = cameraPresets.find(p => p.id === 'hero_view') || cameraPresets[0];

  //Setup invalidation for frameloop=demand
  useEffect(() => {
    const controls = cameraControlsRef.current;
    if (!controls) return;

    //Get initial configuration
    controls.setLookAt(
      initialPreset.position[0],
      initialPreset.position[1],
      initialPreset.position[2],
      initialPreset.target[0],
      initialPreset.target[1],
      initialPreset.target[2],
      false
    );

    // Invalidate scene forcing update
    const onUpdate = () => invalidate();
    controls.addEventListener('update', onUpdate);



    return () => {
      controls.removeEventListener('update', onUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!config) {
    return <div style={{ color: '#fff', padding: '2rem' }}>Vehicle not found in the registry.</div>;
  }

  return (
    <div className={`${styles.configuratorContainer} animate-entry`}>
      {/* Canvas WebGL 3D Scene */}
      <div className={styles.canvasWrapper}>

        <SocialLinks />
        <CameraPresetsUI />
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
          camera={{ 
            position: initialPreset.position, 
            fov: 35 //This need to match leva Store value
          }}
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

          {/* Camera control for better integraton with moving camera, better then orbit contols */}
          <CameraControls 
            ref={(node) => { //DISABLE PAN
              cameraControlsRef.current = node; 
              
              if (node) {
                node.mouseButtons.right = 0; 
              }
            }}
            makeDefault 
            minDistance={2.5} 
            maxDistance={7} 
            maxPolarAngle={Math.PI / 2 - 0.05}
            azimuthRotateSpeed={0.25}
            polarRotateSpeed={0.25}
            smoothTime={0.9}
            draggingSmoothTime={0.90}
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

          <CameraTransitionManager controlsRef={cameraControlsRef} />
          {/* Only developments */}
          <CameraDebugHelper controlsRef={cameraControlsRef} />
          {/* <LevaControllers /> */}
        </Canvas>
      </div>


      <ConfiguratorSidebar config={config} />
    </div>
  );
};

export default Configurator;