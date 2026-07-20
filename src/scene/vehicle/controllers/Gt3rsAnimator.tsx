import { useSpring } from '@react-spring/three';
import { invalidate, useFrame } from '@react-three/fiber';
import { useConfiguratorStore } from '@/store/configuratorStore';
import * as THREE from 'three';

interface Gt3rsAnimatorProps {
  groupRefs: React.MutableRefObject<Record<string, THREE.Object3D>>
}

export default function Gt3rsAnimator({ groupRefs }: { groupRefs: React.MutableRefObject<Record<string, THREE.Object3D>> }) {
  const { doorsOpen, hoodOpen, steeringTurned } = useConfiguratorStore();

  useFrame((state, delta) => {
    // Animazione Porta L
    if (groupRefs.current.Node_Door_L) {
      const target = doorsOpen ? -0.8 : 0;
      groupRefs.current.Node_Door_L.rotation.y = THREE.MathUtils.lerp(
        groupRefs.current.Node_Door_L.rotation.y, target, delta * 5
      );
    }
    // ... ripeti per gli altri nodi ...
    invalidate(); 
  });

  return null;
}