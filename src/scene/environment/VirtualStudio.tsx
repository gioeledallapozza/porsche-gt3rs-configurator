import React, { useEffect } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { useLevaStore } from '@/store/levaStore';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { useThree } from '@react-three/fiber';

const VirtualStudio: React.FC = () => {
  const environment = useLevaStore((state) => state.environment);
  const setEnvReady = useConfiguratorStore((state) => state.setEnvReady);
  const { scene } = useThree();
  
  useEffect(() => {
    // When the scene receives the environment, we unlock the car loading process.
    // This ensure materials to get the envMap property correctly
    if (scene.environment) {
      setEnvReady(true);
    }
    
    // Fallback watcher in case of delays in PMREM generation
    const checkEnv = () => {
      if (scene.environment) {
        setEnvReady(true);
      } else {
        requestAnimationFrame(checkEnv);
      }
    };
    
    if (!scene.environment) {
      checkEnv();
    }

    return () => setEnvReady(false); // Cleanup al dismount
  }, [scene.environment, setEnvReady]); //Update on scene.enviroment change

  return (
    <Environment resolution={1024} background={false}>
      
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