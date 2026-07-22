import { useSpring } from '@react-spring/three';
import { invalidate } from '@react-three/fiber';
import { useConfiguratorStore } from '@/store/configuratorStore';
import * as THREE from 'three';

interface Gt3rsAnimatorProps {
  groupRefs: React.MutableRefObject<Record<string, THREE.Object3D>>;
}

/* eslint-disable react-hooks/immutability */
export default function Gt3rsAnimator({ groupRefs }: Gt3rsAnimatorProps) {
  const { doorsOpen, hoodOpen, steeringTurned } = useConfiguratorStore();

  // DOORS
  useSpring({
    doorVal: doorsOpen ? 1.0 : 0,
    config: { mass: 1.2, tension: 40, friction: 14 },
    onChange: ({ value }) => {
      const nodes = groupRefs.current;
      if (nodes.Node_Door_L) nodes.Node_Door_L.rotation.y = -value.doorVal;
      if (nodes.Node_Door_R) nodes.Node_Door_R.rotation.y = value.doorVal;
      
      invalidate();
    }
  });

  // HOOD
 useSpring({
    hoodVal: hoodOpen ? 0.65 : 0,
    config: { mass: 1.5, tension: 80, friction: 22 },
    onChange: ({ value }) => {
      const nodes = groupRefs.current;
      if (nodes.Node_Hood) nodes.Node_Hood.rotation.x = -value.hoodVal;
      invalidate();
    }
  });

  // STEERING
  useSpring({
    steerVal: steeringTurned ? 0.45 : 0,
    config: { mass: 1, tension: 150, friction: 24 },
    onChange: ({ value }) => {
      const nodes = groupRefs.current;
      if (nodes.Wheel_Node_FL) nodes.Wheel_Node_FL.rotation.y = -value.steerVal;
      if (nodes.Wheel_Node_FR) nodes.Wheel_Node_FR.rotation.y = -value.steerVal;
      invalidate();
    }
  });

  return null;
}