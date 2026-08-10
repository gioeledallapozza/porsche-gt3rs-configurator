import React, { useEffect } from 'react';
import { Lightformer } from '@react-three/drei';
import { useLevaStore } from '@/store/levaStore';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { useEnvExporter } from '@/hooks/useEnvExporter';

const VirtualStudio: React.FC = () => {
  const environment = useLevaStore((state) => state.environment);
  const setEnvReady = useConfiguratorStore((state) => state.setEnvReady);
  
  // Initialize hook
  useEnvExporter();

  useEffect(() => {
    // Force ready to true
    setEnvReady(true);
    return () => setEnvReady(false);
  }, [setEnvReady]);

  return (
    <group>
      <Lightformer form="rect" intensity={environment.envIntensity} color="#ffffff" scale={environment.envScale} position={[0, 20, 0]} rotation-x={Math.PI / 2} />
      <Lightformer form="rect" intensity={environment.lightformerTop} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[environment.lightformerTopScale, environment.lightformerTopScale, 1]} />
      <Lightformer form="rect" intensity={environment.lightformerSide} position={[-5, 2, 0]} rotation-y={Math.PI / 2} scale={[environment.lightformerSideScale, 3, 1]} />
      <Lightformer form="rect" intensity={environment.lightformerSide} position={[5, 2, 0]} rotation-y={-Math.PI / 2} scale={[environment.lightformerSideScale, 3, 1]} />
      <Lightformer form="rect" intensity={environment.lightformerFront} position={[0, 1.5, 5]} rotation-y={Math.PI} scale={[environment.lightformerFrontScale, 0.5, 1]} />
      <Lightformer form="rect" intensity={environment.lightformerRear} position={[0, 1.5, -5]} scale={[environment.lightformerRearScale, 0.5, 1]} />
    </group>
  );
};

export default VirtualStudio;