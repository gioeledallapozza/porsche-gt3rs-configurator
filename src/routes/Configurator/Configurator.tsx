import React from 'react';
import { useParams } from 'react-router-dom';
import { vehicleRegistry } from '../../config/vehicles';
import { useConfiguratorStore } from '../../store/configuratorStore';

const Configurator: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();

  const config = vehicleId ? vehicleRegistry[vehicleId] : null;
  
  //CURRENT STATE
  const currentColor = useConfiguratorStore((state) => state.carColor);

  //ACTIONS
  const setCarColor = useConfiguratorStore((state) => state.setCarColor);

  if (!config) {
    return <div>Vehicle not found in the registry.</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* 
        PHASE 1: Placeholder UI. 
        PHASE 2: Here we will mount canvas 3D WebGL
      */}
      <div 
        style={{ 
          flex: 1, 
          backgroundColor: currentColor, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.3s ease'
        }}
      >
        <h2 style={{ color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          3D Scene Restricted Area (Asset: {config.modelPath})
        </h2>
      </div>

      {/* Pannello UI del Configuratore */}
      <aside style={{ width: '300px', padding: '2rem', backgroundColor: '#f5f5f5', borderLeft: '1px solid #ddd' }}>
        <h3>Paint Options</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '1rem' }}>
          {config.paintOptions.map((paint) => (
            <button
              key={paint.hex}
              onClick={() => setCarColor(paint.hex)}
              title={paint.name}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: paint.hex,
                border: currentColor === paint.hex ? '3px solid #000' : '2px solid transparent',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Configurator;