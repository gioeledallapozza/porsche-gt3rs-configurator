import React, { useRef } from 'react';
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
  const leftPaneRef = useRef<THREE.RectAreaLight>(null!);
  const rightPaneRef = useRef<THREE.RectAreaLight>(null!);

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

       {/* LEFT WINDOW */}
        {/* <group
            position={[interiorLight.leftPane.positionX, interiorLight.leftPane.positionY, interiorLight.leftPane.positionZ]}
            rotation={[interiorLight.leftPane.rotationX, interiorLight.leftPane.rotationY, interiorLight.leftPane.rotationZ]}
        >
          <spotLight
              ref={leftPaneRef}
              visible={interiorLight.leftPane.enabled}
              color="#ffffff"
              intensity={interiorLight.leftPane.intensity * intensityMultiplier}
              angle={Math.PI / 3}
              penumbra={1.0}
              distance={interiorLight.leftPane.distance} // FIX: Now reads from Leva Store!
              decay={2.0}
              castShadow={false}
          >
              <object3D position={[0, 0, -1]} attach="target" />
          </spotLight>
        </group> */}

        {/* RIGHT WINDOW */}
        <group
            position={[interiorLight.rightPane.positionX, interiorLight.rightPane.positionY, interiorLight.rightPane.positionZ]}
            rotation={[interiorLight.rightPane.rotationX, interiorLight.rightPane.rotationY, interiorLight.rightPane.rotationZ]}
        >
          <spotLight
              ref={rightPaneRef}
              visible={interiorLight.rightPane.enabled}
              color="#ffffff"
              intensity={interiorLight.rightPane.intensity * intensityMultiplier}
              angle={Math.PI / 3}
              penumbra={1.0}
              distance={interiorLight.rightPane.distance} // FIX: Now reads from Leva Store!
              decay={2.0}
              castShadow={false}
          >
              <object3D position={[0, 0, -1]} attach="target" />
          </spotLight>
        </group>
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