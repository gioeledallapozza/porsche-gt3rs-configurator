import { vehicleRegistry } from '@/config/vehicles';
import React from 'react';

// 3d Assets Orchestration
const controllerMap: Record<string, React.LazyExoticComponent<React.FC<any>>> = {
  gt3rs: React.lazy(() => import('./controllers/Gt3rsController')),
  // gt4rs: React.lazy(() => import('./controllers/Gt4rsController')),
};

interface VehicleProps {
  vehicleId: string;
}

const Vehicle: React.FC<VehicleProps> = ({ vehicleId }) => {

  console.log(`[Vehicle Router] Rendering vehicle with ID: ${vehicleId}`);

  const config = vehicleRegistry[vehicleId];
  const Controller = controllerMap[vehicleId];

  if (!config || !Controller) {
    console.warn(`[Vehicle Router] Configuration or Controller not found for: ${vehicleId}`);
    return null;
  }
  return (
    <group position={[0, -0.5, 0]}>
      <Controller modelPath={config.modelPath} />
    </group>
  );
};

export default Vehicle;