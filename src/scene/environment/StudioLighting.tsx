import React, { useRef } from 'react';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { useHelper } from '@react-three/drei';
import { useLevaStore } from '@/store/levaStore';
import { useConfiguratorStore } from '@/store/configuratorStore';

RectAreaLightUniformsLib.init();

const StudioLighting: React.FC = () => {
  const dynamicLight = useLevaStore((state) => state.environment.dynamic);
  const interiorLight = useLevaStore((state) => state.environment.interior);

  const renderedCameraPreset = useConfiguratorStore((state) => state.renderedCameraPreset);

  const isInterior = renderedCameraPreset === 'interior_view';
  const intensityMultiplier = isInterior ? 1 : 1;

  const dirLightRef = useRef<THREE.DirectionalLight>(null!);
  const ceilingLightRef = useRef<THREE.SpotLight>(null!);
  const leftPaneRef = useRef<THREE.RectAreaLight>(null!);
  const rightPaneRef = useRef<THREE.RectAreaLight>(null!);
  const dashLightRef = useRef<THREE.RectAreaLight>(null!);

  useHelper(dynamicLight.enabled && dynamicLight.showHelper && dirLightRef, THREE.DirectionalLightHelper, 1, 'yellow');
  
  const showIntHelper = isInterior && interiorLight.enabled && interiorLight.showHelper;
  useHelper(showIntHelper && interiorLight.ceiling.enabled && ceilingLightRef, THREE.SpotLightHelper, 'cyan');
  useHelper(showIntHelper && interiorLight.leftPane.enabled && leftPaneRef, RectAreaLightHelper, 'cyan');
  useHelper(showIntHelper && interiorLight.rightPane.enabled && rightPaneRef, RectAreaLightHelper, 'cyan');
  useHelper(showIntHelper && interiorLight.dash.enabled && dashLightRef, RectAreaLightHelper, 'red');

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

      {/* INTERIOR STUDIO LIGHTING - Sempre montato, intensità controllata dinamicamente */}
      <group visible={interiorLight.enabled}>
        <ambientLight 
            intensity={interiorLight.ambientIntensity * intensityMultiplier} 
            color="#ffffff" 
        />

        <spotLight
            ref={ceilingLightRef}
            visible={interiorLight.ceiling.enabled}
            position={[interiorLight.ceiling.positionX, interiorLight.ceiling.positionY, interiorLight.ceiling.positionZ]}
            angle={interiorLight.ceiling.angle}
            penumbra={interiorLight.ceiling.penumbra}
            intensity={interiorLight.ceiling.intensity * intensityMultiplier}
            distance={interiorLight.ceiling.distance}
            decay={2.0}
            color="#ffffff"
            castShadow={false}
        />

        <rectAreaLight
            ref={leftPaneRef}
            visible={interiorLight.leftPane.enabled}
            width={1.5}
            height={0.6}
            color="#ffffff"
            intensity={interiorLight.leftPane.intensity * intensityMultiplier}
            position={[interiorLight.leftPane.positionX, interiorLight.leftPane.positionY, interiorLight.leftPane.positionZ]}
            rotation={[interiorLight.leftPane.rotationX, interiorLight.leftPane.rotationY, interiorLight.leftPane.rotationZ]}
        />

        <rectAreaLight
            ref={rightPaneRef}
            visible={interiorLight.rightPane.enabled}
            width={1.5}
            height={0.6}
            color="#ffffff"
            intensity={interiorLight.rightPane.intensity * intensityMultiplier}
            position={[interiorLight.rightPane.positionX, interiorLight.rightPane.positionY, interiorLight.rightPane.positionZ]}
            rotation={[interiorLight.rightPane.rotationX, interiorLight.rightPane.rotationY, interiorLight.rightPane.rotationZ]}
        />

        <rectAreaLight
            ref={dashLightRef}
            visible={interiorLight.dash.enabled}
            width={1.4}
            height={0.6}
            color="#ffffff"
            intensity={interiorLight.dash.intensity * intensityMultiplier}
            position={[interiorLight.dash.positionX, interiorLight.dash.positionY, interiorLight.dash.positionZ]}
            rotation={[interiorLight.dash.rotationX, interiorLight.dash.rotationY, interiorLight.dash.rotationZ]}
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