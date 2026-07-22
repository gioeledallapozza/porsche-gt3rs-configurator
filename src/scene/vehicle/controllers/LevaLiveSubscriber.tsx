import { useEffect } from 'react';
import * as THREE from 'three';
import { useLevaStore } from '@/store/levaStore';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { gt3rsConfig } from '@/config/vehicles/gt3rs.config';

interface Props {
  mats: Record<string, THREE.Material>;
}

export default function LevaLiveSubscriber({ mats }: Props) {
  
  useEffect(() => {
    const getActiveFinish = () => {
      const activeColor = useConfiguratorStore.getState().carColor;
      return gt3rsConfig.paintOptions.find(
        (option) => option.hex.toLowerCase() === activeColor.toLowerCase()
      )?.finish;
    };

    const updatePaintMaterial = (val: any, finish: string) => {
      const pMat = mats.paint as THREE.MeshPhysicalMaterial;
      const wMat = mats.exteriorWeissach as THREE.MeshPhysicalMaterial;
      const activeFinish = getActiveFinish();

      if (activeFinish !== finish) return;

      const updateMat = (mat: THREE.MeshPhysicalMaterial) => {
        if (!mat) return;
        mat.clearcoat = val.clearcoat;
        mat.clearcoatRoughness = val.clearcoatRoughness;
        mat.metalness = val.metalness;
        mat.roughness = val.roughness;
        
        if (mat.userData && mat.userData.shaderUniforms) {
          if (val.flakeScale !== undefined) {
             mat.userData.shaderUniforms.uFlakeScale.value = val.flakeScale;
          }
          if (val.flakeIntensity !== undefined) {
             mat.userData.shaderUniforms.uFlakeIntensity.value = val.flakeIntensity;
          }
        }
        
        mat.needsUpdate = false; 
      };

      updateMat(pMat);
      if (useConfiguratorStore.getState().aeroPackage === 'standard') {
        updateMat(wMat);
      }
    };

    const unsubPaintSolid = useLevaStore.subscribe(
      (state) => state.paintSolid,
      (val) => updatePaintMaterial(val, 'solid')
    );

    const unsubPaintMetallic = useLevaStore.subscribe(
      (state) => state.paintMetallic,
      (val) => updatePaintMaterial(val, 'metallic')
    );

    const unsubPaintSpecial = useLevaStore.subscribe(
      (state) => state.paintSpecial,
      (val) => updatePaintMaterial(val, 'special')
    );

    const unsubHeadlight = useLevaStore.subscribe(
      (state) => state.headlight,
      (val) => {
        const hMat = mats.headlightEmissive as THREE.MeshStandardMaterial;
        if (hMat) {
          hMat.color.set(val.color);
          hMat.emissive.set(val.emissive);
          hMat.emissiveIntensity = val.emissiveIntensity;
          hMat.roughness = val.roughness;
          hMat.metalness = val.metalness;
          hMat.toneMapped = false;
          hMat.needsUpdate = true;
        }
      }
    );

    const unsubTaillight = useLevaStore.subscribe(
      (state) => state.taillight,
      (val) => {
        const brakeMat = mats.taillightBrakeEmissive as THREE.MeshStandardMaterial;
        const tailMat = mats.taillightEmissive as THREE.MeshStandardMaterial;

        [brakeMat, tailMat].forEach((mat) => {
          if (!mat) return;
          mat.color.set(val.color);
          mat.emissive.set(val.emissive);
          mat.emissiveIntensity = val.emissiveIntensity;
          mat.roughness = val.roughness;
          mat.metalness = val.metalness;
          mat.toneMapped = false;
          mat.needsUpdate = true;
        });
      }
    );

    const unsubSignal = useLevaStore.subscribe(
      (state) => state.signal,
      (val) => {
        const sMat = mats.signalEmissive as THREE.MeshStandardMaterial;
        if (sMat) {
          sMat.color.set(val.color);
          sMat.emissive.set(val.emissive);
          sMat.emissiveIntensity = val.emissiveIntensity;
          sMat.roughness = val.roughness;
          sMat.metalness = val.metalness;
          sMat.toneMapped = false;
          sMat.needsUpdate = true;
        }
      }
    );

    const unsubLicensePlate = useLevaStore.subscribe(
      (state) => state.licensePlate,
      (val) => {
        const lpMat = mats.licensePlateLight as THREE.MeshStandardMaterial;
        if (lpMat) {
          lpMat.color.set(val.color);
          lpMat.emissive.set(val.emissive);
          lpMat.emissiveIntensity = val.emissiveIntensity;
          lpMat.roughness = val.roughness;
          lpMat.metalness = val.metalness;
          lpMat.toneMapped = false;
          lpMat.needsUpdate = true;
        }
      }
    );

    const unsubCarbonTwill = useLevaStore.subscribe(
      (state) => state.carbonTwill,
      (val) => {
        const cMat = mats.carbonTrimStatic as THREE.MeshPhysicalMaterial;
        const wMat = mats.exteriorWeissach as THREE.MeshPhysicalMaterial;

        if (cMat) {
          cMat.clearcoat = val.clearcoat;
          cMat.clearcoatRoughness = val.clearcoatRoughness;
          cMat.metalness = val.metalness;
          cMat.roughness = val.roughness;
          if (cMat.normalScale) cMat.normalScale.set(val.normalScale, val.normalScale);
        }

        if (wMat && useConfiguratorStore.getState().aeroPackage === 'weissach') {
          wMat.clearcoat = val.clearcoat;
          wMat.clearcoatRoughness = val.clearcoatRoughness;
          wMat.metalness = val.metalness;
          wMat.roughness = val.roughness;
          if (wMat.normalScale) wMat.normalScale.set(val.normalScale, val.normalScale);
        }
      }
    );

    const unsubCarbonForged = useLevaStore.subscribe(
      (state) => state.carbonForged,
      (val) => {
        const wMat = mats.exteriorWeissach as THREE.MeshPhysicalMaterial;

        if (wMat && useConfiguratorStore.getState().aeroPackage === 'weissach_forged') {
          wMat.clearcoat = val.clearcoat;
          wMat.clearcoatRoughness = val.clearcoatRoughness;
          wMat.metalness = val.metalness;
          wMat.roughness = val.roughness;
          if (wMat.normalScale) wMat.normalScale.set(val.normalScale, val.normalScale);
        }
      }
    );

    const unsubMetal = useLevaStore.subscribe(
      (state) => state.metal,
      (val) => {
        const rimPrimary = mats.rimPrimary as THREE.MeshPhysicalMaterial;
        const rimCenter = mats.rimCenter as THREE.MeshPhysicalMaterial;

        [rimPrimary, rimCenter].forEach((mat) => {
          if (!mat) return;
          mat.clearcoat = val.clearcoat;
          mat.clearcoatRoughness = val.clearcoatRoughness;
          mat.metalness = val.metalness;
          mat.roughness = val.roughness;
          mat.envMapIntensity = val.envMapIntensity;
          mat.needsUpdate = true;
        });
      }
    );

    const unsubRubber = useLevaStore.subscribe(
      (state) => state.rubber,
      (val) => {
        const rMat = mats.tire as THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial; 
        if (rMat) {
          rMat.metalness = val.metalness;
          rMat.roughness = val.roughness;
          rMat.envMapIntensity = val.envMapIntensity;
          rMat.needsUpdate = true;
        }
      }
    );

    const unsubCaliper = useLevaStore.subscribe(
      (state) => state.caliper,
      (val) => {
        const cMat = mats.caliper as THREE.MeshPhysicalMaterial;
        if (cMat) {
          cMat.clearcoat = val.clearcoat;
          cMat.clearcoatRoughness = val.clearcoatRoughness;
          cMat.metalness = val.metalness;
          cMat.roughness = val.roughness;
          cMat.envMapIntensity = val.envMapIntensity;
          cMat.needsUpdate = true;
        }
      }
    );

    return () => {
      unsubPaintSolid();
      unsubPaintMetallic();
      unsubPaintSpecial();
      unsubHeadlight();
      unsubTaillight();
      unsubSignal();
      unsubLicensePlate();
      unsubCarbonTwill();
      unsubCarbonForged();
      unsubMetal();
      unsubRubber();
      unsubCaliper();
    };
  }, [mats]);

  return null;
}