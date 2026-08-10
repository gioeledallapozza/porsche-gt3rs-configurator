import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useHelper } from '@react-three/drei';
import { useLevaStore } from '@/store/levaStore';
import { useConfiguratorStore } from '@/store/configuratorStore';

const StudioLighting: React.FC = () => {
  const dynamicLight = useLevaStore((state) => state.environment.dynamic);
  const interiorLight = useLevaStore((state) => state.environment.interior);

  const renderedCameraPreset = useConfiguratorStore((state) => state.renderedCameraPreset);

  const isInterior = renderedCameraPreset === 'interior_view';
  const intensityMultiplier = isInterior ? 1 : 1;

  const dirLightRef = useRef<THREE.DirectionalLight>(null!);
  const ceilingLightRef = useRef<THREE.SpotLight>(null!);
  const leftPaneRef = useRef<THREE.SpotLight>(null!);
  const rightPaneRef = useRef<THREE.SpotLight>(null!);

  // Explicit, stable target objects: position + aim are now fully decoupled and
  // independently Leva-tunable (no more position+rotation+fixed-local-offset trig).
  const ceilingTarget = useMemo(() => new THREE.Object3D(), []);
  const leftPaneTarget = useMemo(() => new THREE.Object3D(), []);
  const rightPaneTarget = useMemo(() => new THREE.Object3D(), []);

  useHelper(dynamicLight.enabled && dynamicLight.showHelper && dirLightRef, THREE.DirectionalLightHelper, 1, 'yellow');
  
  const showIntHelper = isInterior && interiorLight.enabled && interiorLight.showHelper;
  useHelper(showIntHelper && interiorLight.ceiling.enabled && ceilingLightRef, THREE.SpotLightHelper, 'cyan');
  useHelper(showIntHelper && interiorLight.leftPane.enabled && leftPaneRef, THREE.SpotLightHelper, 'cyan');
  useHelper(showIntHelper && interiorLight.rightPane.enabled && rightPaneRef, THREE.SpotLightHelper, 'cyan');

  return (
    <group>
      {/* EXTERIOR LIGHTING */}
      <directionalLight
        ref={dirLightRef}
        castShadow
        visible={dynamicLight.enabled}
        position={[dynamicLight.positionX, dynamicLight.positionY, dynamicLight.positionZ]}
        intensity={dynamicLight.intensity * (isInterior ? 0 : 1)} // Spegni fuori se sei dentro (opzionale)
        shadow-mapSize={[dynamicLight.shadowMapSize, dynamicLight.shadowMapSize]}
        shadow-bias={dynamicLight.shadowBias}
        shadow-normalBias={dynamicLight.shadowNormalBias}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-dynamicLight.shadowCameraSize, dynamicLight.shadowCameraSize, dynamicLight.shadowCameraSize, -dynamicLight.shadowCameraSize, 0.5, 12]}
        />
      </directionalLight>

     {/* INTERIOR STUDIO LIGHTING */}
      <group visible={interiorLight.enabled}>
        <ambientLight 
            layers={1} 
            intensity={interiorLight.ambientIntensity * intensityMultiplier} 
            color="#ffffff" 
        />

        {/* CEILING */}
        <primitive
            object={ceilingTarget}
            position={[interiorLight.ceiling.targetX, interiorLight.ceiling.targetY, interiorLight.ceiling.targetZ]}
        />
        <spotLight
            ref={ceilingLightRef}
            visible={interiorLight.ceiling.enabled}
            position={[interiorLight.ceiling.positionX, interiorLight.ceiling.positionY, interiorLight.ceiling.positionZ]}
            target={ceilingTarget}
            angle={interiorLight.ceiling.angle}
            penumbra={interiorLight.ceiling.penumbra}
            intensity={interiorLight.ceiling.intensity * intensityMultiplier}
            distance={interiorLight.ceiling.distance}
            decay={interiorLight.ceiling.decay}
            color="#ffffff"
            castShadow={false}
        />

       {/* LEFT WINDOW */}
        <primitive
            object={leftPaneTarget}
            position={[interiorLight.leftPane.targetX, interiorLight.leftPane.targetY, interiorLight.leftPane.targetZ]}
        />
        <spotLight
            ref={leftPaneRef}
            visible={interiorLight.leftPane.enabled}
            position={[interiorLight.leftPane.positionX, interiorLight.leftPane.positionY, interiorLight.leftPane.positionZ]}
            target={leftPaneTarget}
            color="#ffffff"
            intensity={interiorLight.leftPane.intensity * intensityMultiplier}
            angle={interiorLight.leftPane.angle}
            penumbra={interiorLight.leftPane.penumbra}
            distance={interiorLight.leftPane.distance}
            decay={interiorLight.leftPane.decay}
            castShadow={false}
        />

        {/* RIGHT WINDOW */}
        <primitive
            object={rightPaneTarget}
            position={[interiorLight.rightPane.targetX, interiorLight.rightPane.targetY, interiorLight.rightPane.targetZ]}
        />
        <spotLight
            ref={rightPaneRef}
            visible={interiorLight.rightPane.enabled}
            position={[interiorLight.rightPane.positionX, interiorLight.rightPane.positionY, interiorLight.rightPane.positionZ]}
            target={rightPaneTarget}
            color="#ffffff"
            intensity={interiorLight.rightPane.intensity * intensityMultiplier}
            angle={interiorLight.rightPane.angle}
            penumbra={interiorLight.rightPane.penumbra}
            distance={interiorLight.rightPane.distance}
            decay={interiorLight.rightPane.decay}
            castShadow={false}
        />
      </group>

      {/* SHADOW PLANE */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial transparent opacity={0.6} color="#000000" />
      </mesh>
    </group>
  );
};

export default StudioLighting;