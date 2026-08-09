import React, { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useKtx2Disposal } from '@/hooks/useKtx2Disposal';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { gt3rsConfig } from '@/config/vehicles/gt3rs.config.ts';
import Gt3rsMutator from './Gt3rsMutator'; 
import Gt3rsAnimator from './Gt3rsAnimator';
import Gt3rsHotspots from './Gt3rsHotspots';
import Gt3rsModel from '@/scene/vehicle/models/Gt3rsModel.tsx';
import LevaLiveSubscriber from './LevaLiveSubscriber';

//MATERIALS SETUP
import { configureCabinGlass, configureLightsGlass } from '@/scene/materials/presets/glass';
import { applyPlastic } from '@/scene/materials/presets/plastic';
import { applyCarbonFiber, applyForgedCarbon } from '@/scene/materials/presets/carbonFiber';
import { 
  configureHeadlightDRL, 
  configureTaillightEmissive, 
  configureSignalEmissive, 
  configureLicensePlateLight 
} from '@/scene/materials/presets/lights';
import { applyMetallicPaint, applySolidPaint, applySpecialPaint } from '@/scene/materials/presets/paint';
import { applyAlloyFinish } from '@/scene/materials/presets/metals';
import { applyCaliperPaint } from '@/scene/materials/presets/caliper';
import { applyRubberFinish } from '@/scene/materials/presets/rubber';
import { applyLeather } from '@/scene/materials/presets/leather';

const MemoizedGt3rsModel = React.memo(Gt3rsModel);

interface Gt3rsControllerProps {
  modelPath: string;
}

/* eslint-disable react-hooks/immutability */
export default function Gt3rsController({ modelPath }: Gt3rsControllerProps) {
  //Assets loading
  const { materials, nodes } = useGLTF(modelPath);
  const { scene, gl } = useThree();
  const groupRefs = useRef<Record<string, THREE.Object3D>>({}); //Nodes
  
  //Load textures
  const {
  carbonNormal, carbonRoughness,
  forgedNormal, forgedRoughness,
  aluminumNormal, aluminumRoughness,
  leatherNormal, leatherArm,
  carpetAo, 
  // tubAo, metalAccentAo,
  } = useKtx2Disposal(gt3rsConfig.texturePack);
  

 // Apply shadows only to certains nodes based on custom blender properties
 // Assign reference to certains nodes to enable animations
 useLayoutEffect(() => {
  if (!nodes) return;

  // Setup Animation Nodes
  ['Node_Door_L', 'Node_Door_R', 'Node_Hood', 'Wheel_Node_FL', 'Wheel_Node_FR'].forEach(name => {
    const node = scene.getObjectByName(name);
    if (node) groupRefs.current[name] = node;
  });

  // Recursive function: searches for the custom property in the node. If it is not found, it checks the parent.
  // NOTE: maybe assign manually to each mesh the properties instead of the group for efficiency
  // const getInheritedShadow = (gltfNode: THREE.Object3D, property: 'castShadow' | 'receiveShadow'): boolean => {
  //   if (!gltfNode) return false;
    
  //   // If Blender has saved the property (1 or true)
  //   if (gltfNode.userData[property] !== undefined) {
  //     return gltfNode.userData[property] === 1 || gltfNode.userData[property] === true;
  //   }
    
  //   // If it's not there, check the parent.
  //   if (gltfNode.parent) {
  //     return getInheritedShadow(gltfNode.parent, property);
  //   }
    
  //   return false;
  // };

  // By default gltfjsx groups doesn't support custom properties, this is why we get the original node
  // scene.traverse((r3fNode) => {
  //   // Only meshes
  //   if (!(r3fNode instanceof THREE.Mesh)) return;

  //   // // Retrieve the original GLTF object using the name.
  //   // const gltfNode = nodes[r3fNode.name];
  //   // if (!gltfNode) return;

  //   // // Calculates inheritance in real time (O(D), where D is the depth of the tree).
  //   // const shouldCast = getInheritedShadow(gltfNode, 'castShadow');
  //   // const shouldReceive = getInheritedShadow(gltfNode, 'receiveShadow');

  //   // // Apply only in case of discrepancy to save on WebGL recalculations
  //   // if (r3fNode.castShadow !== shouldCast) {
  //   //   r3fNode.castShadow = shouldCast;
  //   // }
  //   // if (r3fNode.receiveShadow !== shouldReceive) {
  //   //   r3fNode.receiveShadow = shouldReceive;
  //   // }

  //   // Ensure uv2 exists for baked AO / lightmap workflows
  //   // const geometry = r3fNode.geometry;
  //   // if (
  //   //   geometry &&
  //   //   geometry.attributes &&
  //   //   !geometry.attributes.uv2 &&
  //   //   geometry.attributes.uv
  //   // ) {
  //   //   geometry.setAttribute('uv2', geometry.attributes.uv);
  //   // }
  // });
}, [nodes, scene]);

  // STATIC MATERIAL INITIALIZATION
  const mats = useMemo(() => {

    [carbonNormal, carbonRoughness, forgedNormal, forgedRoughness, aluminumNormal, 
      aluminumRoughness, leatherNormal, leatherArm, carpetAo].forEach(tex => {
      if (!tex) return;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.minFilter = THREE.LinearMipMapLinearFilter;
      tex.anisotropy = gl.capabilities.getMaxAnisotropy();
      tex.colorSpace = THREE.NoColorSpace;
    });

    const extractedMaterials = {
      // Standard
      paint: materials.Material_Chassis_Paint as THREE.MeshPhysicalMaterial,
      glassCabin: materials.Material_Glass_Cabin_Static as THREE.MeshPhysicalMaterial,
      glassLights: materials.Material_Glass_Lights_Static as THREE.MeshPhysicalMaterial,
      carbonTrimStatic: materials.Material_Carbon_Trim_Static as THREE.MeshPhysicalMaterial,
      interiorCarbonTrimStatic: materials.Material_Interior_Carbon_Trim_Static as THREE.MeshPhysicalMaterial,
      exteriorLowerAero: materials.Material_Exterior_LowerAero_Dynamic as THREE.MeshPhysicalMaterial,
      exteriorWeissach: materials.Material_Exterior_Weissach_Dynamic as THREE.MeshPhysicalMaterial,
      rimPrimary: materials.Material_Rim_Primary as THREE.MeshPhysicalMaterial,
      rimCenter: materials.Material_Rim_Centerlock as THREE.MeshPhysicalMaterial,
      caliper: materials.Material_Caliper_Dynamic as THREE.MeshPhysicalMaterial,
      tire: materials.Material_Tire_Static as THREE.MeshStandardMaterial, //To convert to physical material? MAybe not

      // Emissives
      headlightEmissive: materials.Material_Headlight_Emissive as THREE.MeshStandardMaterial,
      taillightBrakeEmissive: materials.Material_Taillight_Brake_Emissive as THREE.MeshStandardMaterial,
      taillightEmissive: materials.Material_Taillight_Emissive as THREE.MeshStandardMaterial,
      signalEmissive: materials.Material_Signal_Emissive as THREE.MeshStandardMaterial,
      licensePlateLight: materials.Material_LicensePlateLight_Emissive as THREE.MeshStandardMaterial,

      // Interior Dynamics
      stitching: materials.Material_Interior_Stitching_Dynamic as THREE.MeshPhysicalMaterial,
      interiorTrim: materials.Material_Interior_Accent_Dynamic as THREE.MeshPhysicalMaterial,
      leatherPrimary: materials.Material_Leather_Primary as THREE.MeshPhysicalMaterial,
      leatherSecondary: materials.Material_Leather_Secondary as THREE.MeshPhysicalMaterial,
      seatbelt: materials.Material_SeatBelt_Dynamic as THREE.MeshPhysicalMaterial,
      leatherUpper: materials.Material_Upper_Leather_Dynamic as THREE.MeshPhysicalMaterial,
    };

    // Glass
    configureCabinGlass(extractedMaterials.glassCabin);
    configureLightsGlass(extractedMaterials.glassLights);

    // Emissive
    configureHeadlightDRL(extractedMaterials.headlightEmissive);
    configureTaillightEmissive(extractedMaterials.taillightBrakeEmissive);
    configureTaillightEmissive(extractedMaterials.taillightEmissive);
    configureSignalEmissive(extractedMaterials.signalEmissive);
    configureLicensePlateLight(extractedMaterials.licensePlateLight);

    // Static 
    applyPlastic(extractedMaterials.exteriorLowerAero)
    applyRubberFinish(extractedMaterials.tire);
    applyLeather(extractedMaterials.leatherUpper, 'rgb(22, 22, 22)', { normalMap: leatherNormal, armMap: leatherArm });
    
    // PURGE BLENDER TEXTURES
    if (extractedMaterials.exteriorWeissach.map) {
      extractedMaterials.exteriorWeissach.map = null;
      extractedMaterials.exteriorWeissach.needsUpdate = true; 
    }

    // Standard
    applyCarbonFiber(extractedMaterials.carbonTrimStatic, {
      normalMap: carbonNormal,
      roughnessMap: carbonRoughness,
    });
    applyCarbonFiber(extractedMaterials.interiorCarbonTrimStatic, {
      normalMap: carbonNormal,
      roughnessMap: carbonRoughness,
    });

    const { carColor, aeroPackage, wheelColor, caliperColor } = useConfiguratorStore.getState(); //Get initial configuration
    
    //Deafult wheel color
    applyAlloyFinish(extractedMaterials.rimPrimary, wheelColor);
    applyAlloyFinish(extractedMaterials.rimCenter, wheelColor);
    applyCaliperPaint(extractedMaterials.caliper, caliperColor);

    const activeColorConfig = gt3rsConfig.paintOptions.find(
      (opt) => opt.hex.toLowerCase() === carColor.toLowerCase()
    );

    if (activeColorConfig) {
      const applyPaint = (mat: THREE.MeshPhysicalMaterial) => {
        if (activeColorConfig.finish === 'solid') applySolidPaint(mat, activeColorConfig.hex);
        else if (activeColorConfig.finish === 'metallic') applyMetallicPaint(mat, activeColorConfig.hex);
        else applySpecialPaint(mat, activeColorConfig);
      };

      // Colore Carrozzeria Iniziale
      applyPaint(extractedMaterials.paint);
      
      // Aero Package Iniziale
      if (aeroPackage === 'weissach') {
        applyCarbonFiber(extractedMaterials.exteriorWeissach, { normalMap: carbonNormal, roughnessMap: carbonRoughness });
      } else if (aeroPackage === 'weissach_forged') {
        applyForgedCarbon(extractedMaterials.exteriorWeissach, { normalMap: forgedNormal, roughnessMap: forgedRoughness });
      } else {
        applyPaint(extractedMaterials.exteriorWeissach);
      }
    }

    // EnvMap
    if (scene.environment) {
      // Update to all materials the envMap
      // Cache Patching: useGLTF ignores the custom envMap even if is loaded
      Object.values(materials).forEach((mat) => {
        if ('envMap' in mat && mat.envMap !== scene.environment) {
          mat.envMap = scene.environment;
        }
      });
    }

    // AMBIENT OCCLUSION MAPS APPLY ONLY ONE TIME
    // CARPET
    if (carpetAo) {
      [
        materials.Material_Interior_Carpet_Static as THREE.MeshStandardMaterial,
        materials.Material_Interior_Structure_Static as THREE.MeshStandardMaterial,
      ].forEach((mat) => {
        if (!mat) return;
        mat.aoMap = carpetAo;
        mat.aoMapIntensity = 1.0;

        if (mat.name.includes('Carpet')) mat.envMapIntensity = 0.0;

        mat.needsUpdate = true;
      });
    }

    // NOT USED BECAUSE OF UV MAP BUGGED IN MODEL
    // TUB
    // if (tubAo) {
    //   [
    //     materials.Material_Interior_Metal_Black_Lucid_Static as THREE.MeshStandardMaterial,
    //     materials.Material_Interior_Plastic_Lucid_Static as THREE.MeshStandardMaterial,
    //     materials.Material_Carbon_Trim_Static as THREE.MeshStandardMaterial,
    //     materials.Material_Warning_Triangle_Static as THREE.MeshStandardMaterial,
    //     materials.Material_Speakers_Static as THREE.MeshStandardMaterial,
    //     materials.Material_Behind_Vents_Static as THREE.MeshStandardMaterial,
    //     materials.Material_Interior_Plastic_Darker_Static as THREE.MeshStandardMaterial,
    //     materials.Material_Interior_Metallic_Structure_Static as THREE.MeshStandardMaterial,
    //   ].forEach((mat) => {
    //     if (!mat) return;
    //     mat.aoMap = tubAo;
    //     mat.aoMapIntensity = 1.0;
    //     mat.needsUpdate = true;
    //   });
    // }

    // METAL INTERIOR
    // if (metalAccentAo) {
    //   const accentMat = materials.Material_Interior_Metal_Static as THREE.MeshStandardMaterial;
    //   if (accentMat) {
    //     accentMat.aoMap = metalAccentAo;
    //     accentMat.aoMapIntensity = 1.0;
    //     accentMat.needsUpdate = true;
    //   }
    // }

    return extractedMaterials;
  }, [materials, carbonNormal, carbonRoughness, forgedNormal, forgedRoughness, aluminumNormal, aluminumRoughness, leatherNormal, leatherArm, carpetAo, gl, scene.environment]);

  // Memoize textures to prevent infinite reference changes and battery drain
  const texturePack = useMemo(() => ({
    carbonNormal,
    carbonRoughness,
    forgedNormal,
    forgedRoughness,
    aluminumNormal,
    aluminumRoughness,
    leatherNormal,
    leatherArm
  }), [carbonNormal, carbonRoughness, forgedNormal, forgedRoughness, aluminumNormal, aluminumRoughness, leatherNormal, leatherArm]);

  // Orchestration
  return (
    <>
      <Gt3rsMutator mats={mats} textures={texturePack}/>
      <LevaLiveSubscriber mats={mats} />
      <Gt3rsAnimator groupRefs={groupRefs} />
      <Gt3rsHotspots />
      <MemoizedGt3rsModel url={modelPath} />
    </>
  );
}