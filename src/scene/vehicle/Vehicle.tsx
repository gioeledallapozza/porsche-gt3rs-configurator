import { vehicleRegistry } from '@/config/vehicles';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { useKtx2Disposal } from '@/hooks/useKtx2Disposal';
import { useConfiguratorStore } from '@/store/configuratorStore';



interface ControllerProps {
  modelPath: string;
}

// The import functions separate from React.lazy allow us to
// manually trigger the download of the controller's JS chunk,
// before React requests it for rendering.
const controllerLoaders: Record<string, () => Promise<{ default: React.FC<ControllerProps> }>> = {
  gt3rs: () => import('./controllers/Gt3rsController'),
  //gt4rs: () => import('./controllers/Gt3rsController')
};

// 3d Assets Orchestration
const controllerMap: Record<string, React.LazyExoticComponent<React.FC<ControllerProps>>> = {
  gt3rs: React.lazy(controllerLoaders.gt3rs),
  //gt4rs: React.lazy(controllerLoaders.gt4rs)
};

interface VehicleProps {
  vehicleId: string;
}

const Vehicle: React.FC<VehicleProps> = ({ vehicleId }) => {
  const config = vehicleRegistry[vehicleId];
  const Controller = controllerMap[vehicleId];
  const { gl } = useThree();

  const isEnvReady = useConfiguratorStore((state) => state.isEnvReady);

  // Non-blocking preload: GLB, KTX2 textures, and JS chunks start in parallel
  // with envMap (PMREM) generation, rather than after it.
  useEffect(() => {
    if (!config) return;
    useGLTF.preload(config.modelPath, '/draco/');
    useKtx2Disposal.preload(config.texturePack, gl);
    controllerLoaders[vehicleId]?.();
  }, [config, vehicleId, gl]);

  if (!config || !Controller) {
    console.warn(`[Vehicle Router] Configuration or Controller not found for: ${vehicleId}`);
    return null;
  }

  // Wait for envmap before loading the model
  if (!isEnvReady) {
    return null;
  }

  return (
    <group position={[0, 0, 0]}>
        <Controller key={vehicleId} modelPath={config.modelPath}/>
    </group>
  );
};

export default Vehicle;