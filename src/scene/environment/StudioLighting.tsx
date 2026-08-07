import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { useThree } from '@react-three/fiber';
import { useLevaStore } from '@/store/levaStore';
import { useConfiguratorStore } from '@/store/configuratorStore';

RectAreaLightUniformsLib.init();

const StudioLighting: React.FC = () => {
  const dirLightRef = useRef<THREE.DirectionalLight>(null!);
  const helperRef = useRef<THREE.CameraHelper | null>(null);
  const { scene } = useThree();
  const dynamicLight = useLevaStore((state) => state.environment.dynamic);

  const activeCameraPreset = useConfiguratorStore((state) => state.activeCameraPreset);
  const isInterior = activeCameraPreset === 'interior_view';

  // Adjust the directional light's position based on the camera preset
  useEffect(() => {
    if (!dirLightRef.current) {
      return;
    }

    dirLightRef.current.updateMatrixWorld();

    if (helperRef.current) {
      scene.remove(helperRef.current);
      helperRef.current.dispose();
      helperRef.current = null;
    }

    if (dynamicLight.enabled && dynamicLight.showHelper) {
      const shadowHelper = new THREE.CameraHelper(dirLightRef.current.shadow.camera);
      helperRef.current = shadowHelper;
      scene.add(shadowHelper);
    }

    return () => {
      if (helperRef.current) {
        scene.remove(helperRef.current);
        helperRef.current.dispose();
        helperRef.current = null;
      }
    };
  }, [scene, dynamicLight.enabled, dynamicLight.showHelper]);

  return (
    <group>
      {/* EXTERIOR LIGHTING */}
      {dynamicLight.enabled ? (
        <directionalLight
          ref={dirLightRef}
          castShadow
          position={[dynamicLight.positionX, dynamicLight.positionY, dynamicLight.positionZ]}
          intensity={dynamicLight.intensity}
          shadow-mapSize={[dynamicLight.shadowMapSize, dynamicLight.shadowMapSize]}
          shadow-bias={dynamicLight.shadowBias}
          shadow-normalBias={dynamicLight.shadowNormalBias}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-dynamicLight.shadowCameraSize, dynamicLight.shadowCameraSize, dynamicLight.shadowCameraSize, -dynamicLight.shadowCameraSize, 0.5, 12]}
          />
        </directionalLight>
      ) : null}

     {/* INTERIOR STUDIO LIGHTING (Si attiva solo dentro) */}
      {isInterior && (
        <group>
          {/* 1. Ambient Light Base: bassissima, solo per non avere neri a 0 */}
          <ambientLight intensity={0.3} color="#ffffff" />
          
          {/* 2. LA TUA IDEA (Plafoniera): SpotLight dall'alto 
              Illumina morbidamente console centrale, cambio e sedili */}
          <spotLight
            position={[0, 1.3, -0.1]} 
            angle={Math.PI / 2.5} // Cono largo     
            penumbra={1.0}        // Sfumatura massima, zero bordi netti
            intensity={4.0}       // Bilanciata
            distance={2.5}            
            decay={2.0}
            color="#ffffff"
            castShadow={false}
          />

          {/* 3. VETRO SINISTRO (Guidatore): 
              Un pannello largo 1.5m che guarda verso l'interno */}
          <rectAreaLight
            width={1.5}
            height={0.6}
            color="#ffffff"
            intensity={3.0}
            position={[0.8, 0.8, 0]} // Posizionato sul vetro
            rotation={[0, Math.PI / 2, 0]} // Guarda verso destra (dentro l'auto)
          />

          {/* 4. VETRO DESTRO (Passeggero): 
              Un pannello speculare che guarda verso l'interno */}
          <rectAreaLight
            width={1.5}
            height={0.6}
            color="#ffffff"
            intensity={3.0}
            position={[-0.8, 0.8, 0]} // Posizionato sul vetro
            rotation={[0, -Math.PI / 2, 0]} // Guarda verso sinistra (dentro l'auto)
          />

          {/* 5. PARABREZZA (Opzionale, ma fa la differenza): 
              Dà quel bel colpo di luce sul cruscotto superiore e sul volante */}
          <rectAreaLight
            width={1.4}
            height={0.6}
            color="#ffffff"
            intensity={2.0}
            position={[0, 0.9, 0.6]} // Posizionato sul cruscotto anteriore
            rotation={[-Math.PI / 6, Math.PI, 0]} // Inclinato verso i sedili
          />
        </group>
      )}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial transparent opacity={0.6} color="#000000" />
      </mesh>
    </group>
  );
};

export default StudioLighting;