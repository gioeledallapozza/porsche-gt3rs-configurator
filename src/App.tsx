import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';

function ConfiguratorScene() {
  // Leva UI per modificare i parametri del materiale in tempo reale
  const { boxColor, lightIntensity } = useControls({
    boxColor: '#ff0000',
    lightIntensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
  });

  return (
    <>
      <Perf position="top-left" />
      
      <OrbitControls makeDefault />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={lightIntensity} castShadow />

      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={boxColor} roughness={0.2} metalness={0.8} />
      </mesh>
    </>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
        <ConfiguratorScene />
      </Canvas>
    </div>
  );
}