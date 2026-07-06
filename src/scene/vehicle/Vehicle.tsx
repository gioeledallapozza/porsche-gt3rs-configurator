import React from 'react';
import { useConfiguratorStore } from '../../store/configuratorStore';

// 3D Asset Orchestrator
// Load the component only when it's needed with React.lazy
const PorscheModel = React.lazy(() => import('./PorscheModel'));

const Vehicle: React.FC = () => {
  const carColor = useConfiguratorStore((state) => state.carColor);

  return (
    <group position={[0, -0.5, 0]}>
      <PorscheModel exteriorColor={carColor} />
    </group>
  );
};

export default Vehicle;