import { Html } from '@react-three/drei';
import { useConfiguratorStore } from '@/store/configuratorStore';

export default function Gt3rsHotspots() {
  const { toggleDoors, toggleHood, toggleSteering } = useConfiguratorStore();

  // Stile per il cerchietto pulito
  const hotspotStyle = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    backdropFilter: 'blur(4px)',
    transition: 'transform 0.2s, background-color 0.2s',
  };

  return (
    <group>
      
      {/* LEFT DOOR */}
      <Html position={[0.9, 0.6, 0.2]} center>
        <div 
          style={hotspotStyle} 
          onClick={toggleDoors}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        />
      </Html>
      
      {/* HOOD */}
      <Html position={[0, 0.7, 1.8]} center>
        <div 
          style={hotspotStyle} 
          onClick={toggleHood}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        />
      </Html>

      {/* WHEEL Left-Back */}
      <Html position={[-0.9, 0.4, 1.2]} center>
        <div 
          style={hotspotStyle} 
          onClick={toggleSteering}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        />
      </Html>
    </group>
  );
}