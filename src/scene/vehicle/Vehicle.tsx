import { vehicleRegistry } from '@/config/vehicles';
import { useConfiguratorStore } from '@/store/configuratorStore';
import React from 'react';

interface ControllerProps {
  modelPath: string;
}

// 3d Assets Orchestration
const controllerMap: Record<string, React.LazyExoticComponent<React.FC<ControllerProps>>> = {
  gt3rs: React.lazy(() => import('./controllers/Gt3rsController')),
  // gt4rs: React.lazy(() => import('./controllers/Gt4rsController')),
};

interface VehicleProps {
  vehicleId: string;
}

const Vehicle: React.FC<VehicleProps> = ({ vehicleId }) => {
  const config = vehicleRegistry[vehicleId];
  const Controller = controllerMap[vehicleId];

  const isEnvReady = useConfiguratorStore((state) => state.isEnvReady);

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