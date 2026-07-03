import React from 'react';
import { useConfiguratorStore } from '../../store/configuratorStore';

// 3D Asset Orchestrator
// Load the component only when it's needed with React.lazy
const PorscheGT3RS = React.lazy(() => import('./PorscheGT3RS'));

const Vehicle: React.FC = () => {

  //Use only attributes of the store needed
  const carColor = useConfiguratorStore((state) => state.carColor);
  // wheel...

  return (
    <group>
      <PorscheGT3RS carColor={carColor} />
    </group>
  );
};

export default Vehicle;