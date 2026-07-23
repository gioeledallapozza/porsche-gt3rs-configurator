import React, { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { invalidate, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useLevaStore } from '@/store/levaStore';

const toneMappingOptions = {
  None: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
};

export const CameraSettings: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const cameraState = useLevaStore((state) => state.camera);
  const postState = useLevaStore((state) => state.post);
  const camera = useThree((state) => state.camera as THREE.PerspectiveCamera);
  const gl = useThree((state) => state.gl);
  const controls = useThree((state) => state.controls as any | null);

  useControls({
    Camera: folder({
      fov: {
        value: cameraState.fov,
        min: 10,
        max: 90,
        step: 1,
        onChange: (value) => setTweaks('camera', { fov: value as number }),
      },
      positionX: {
        value: cameraState.positionX,
        min: -10,
        max: 10,
        step: 0.1,
        onChange: (value) => setTweaks('camera', { positionX: value as number }),
      },
      positionY: {
        value: cameraState.positionY,
        min: -5,
        max: 10,
        step: 0.1,
        onChange: (value) => setTweaks('camera', { positionY: value as number }),
      },
      positionZ: {
        value: cameraState.positionZ,
        min: -10,
        max: 10,
        step: 0.1,
        onChange: (value) => setTweaks('camera', { positionZ: value as number }),
      },
      targetX: {
        value: cameraState.targetX,
        min: -5,
        max: 5,
        step: 0.1,
        onChange: (value) => setTweaks('camera', { targetX: value as number }),
      },
      targetY: {
        value: cameraState.targetY,
        min: -5,
        max: 5,
        step: 0.1,
        onChange: (value) => setTweaks('camera', { targetY: value as number }),
      },
      targetZ: {
        value: cameraState.targetZ,
        min: -10,
        max: 10,
        step: 0.1,
        onChange: (value) => setTweaks('camera', { targetZ: value as number }),
      },
    }, { collapsed: true }),
    Post: folder({
      exposure: {
        value: postState.exposure,
        min: 0,
        max: 5,
        step: 0.01,
        onChange: (value) => setTweaks('post', { exposure: value as number }),
      },
      toneMapping: {
        value: postState.toneMapping,
        options: toneMappingOptions,
        onChange: (value) => setTweaks('post', { toneMapping: value as THREE.ToneMapping }),
      },
    }, { collapsed: true }),
  });

  useEffect(() => {
    camera.fov = cameraState.fov;
    camera.updateProjectionMatrix();

    if (controls?.setPosition && controls?.setTarget) {
      controls.setPosition(cameraState.positionX, cameraState.positionY, cameraState.positionZ, 0);
      controls.setTarget(cameraState.targetX, cameraState.targetY, cameraState.targetZ, 0);
      controls.update(0);
      invalidate();
    } else if (controls?.setLookAt) {
      controls.setLookAt(
        cameraState.positionX,
        cameraState.positionY,
        cameraState.positionZ,
        cameraState.targetX,
        cameraState.targetY,
        cameraState.targetZ,
        0
      );
      controls.update(0);
      invalidate();
    } else {
      camera.position.set(cameraState.positionX, cameraState.positionY, cameraState.positionZ);
      camera.lookAt(cameraState.targetX, cameraState.targetY, cameraState.targetZ);
      invalidate();
    }

    gl.toneMapping = postState.toneMapping;
    gl.toneMappingExposure = postState.exposure;
  }, [camera, controls, gl, cameraState, postState]);

  return null;
};
