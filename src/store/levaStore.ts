import * as THREE from 'three';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { invalidate } from '@react-three/fiber';

type Category =
  | 'environment'
  | 'paintSolid'
  | 'paintMetallic'
  | 'paintSpecial'
  | 'carbonTwill'
  | 'carbonForged'
  | 'metal'
  | 'leather'
  | 'aluminum'
  | 'headlight'
  | 'taillight'
  | 'signal'
  | 'licensePlate'
  | 'camera'
  | 'post'
  | 'caliper'
  | 'rubber'
  | 'glassCabin'
  | 'glassLights';

interface LightMaterialState {
  color: string;
  emissive: string;
  emissiveIntensity: number;
  roughness: number;
  metalness: number;
  ior: number;
  envMapIntensity: number;
}

interface LevaState {
  environment: {
    envIntensity: number;
    lightformerTop: number;
    lightformerSide: number;
    lightformerFront: number;
    lightformerRear: number;
    envScale: number;
    lightformerTopScale: number;
    lightformerSideScale: number;
    lightformerFrontScale: number;
    lightformerRearScale: number;
    dynamic: {
      enabled: boolean;
      showHelper: boolean;
      intensity: number;
      positionX: number;
      positionY: number;
      positionZ: number;
      shadowBias: number;
      shadowNormalBias: number;
      shadowMapSize: number;
      shadowCameraSize: number;
    };
    interior: {
      enabled: boolean;
      showHelper: boolean;
      ambientIntensity: number;
      ceiling: {
        enabled: boolean;
        intensity: number;
        positionX: number;
        positionY: number;
        positionZ: number;
        targetX: number;
        targetY: number;
        targetZ: number;
        angle: number;
        penumbra: number;
        distance: number;
        decay: number;
      };
      leftPane: {
        enabled: boolean;
        intensity: number;
        positionX: number;
        positionY: number;
        positionZ: number;
        targetX: number;
        targetY: number;
        targetZ: number;
        angle: number;
        penumbra: number;
        distance: number;
        decay: number;
      };
      rightPane: {
        enabled: boolean;
        intensity: number;
        positionX: number;
        positionY: number;
        positionZ: number;
        targetX: number;
        targetY: number;
        targetZ: number;
        angle: number;
        penumbra: number;
        distance: number;
        decay: number;
      };
    };
  };
  paintSolid: { clearcoat: number; clearcoatRoughness: number; metalness: number; roughness: number; envMapIntensity: number; };
  paintMetallic: { 
    clearcoat: number; 
    clearcoatRoughness: number; 
    metalness: number; 
    roughness: number; 
    envMapIntensity: number; 
    flakeScale: number;
    flakeIntensity: number; };
  paintSpecial: { clearcoat: number; clearcoatRoughness: number; metalness: number; roughness: number; envMapIntensity: number; };
  carbonTwill: { color: string; clearcoat: number; clearcoatRoughness: number; metalness: number; roughness: number; normalScale: number; envMapIntensity: number; };
  carbonForged: { color: string; clearcoat: number; clearcoatRoughness: number; metalness: number; roughness: number; normalScale: number; envMapIntensity: number; };
  metal: { clearcoat: number; clearcoatRoughness: number; metalness: number; roughness: number; envMapIntensity: number; };
  leather: { roughness: number; metalness: number; clearcoat: number; clearcoatRoughness: number; sheen: number; sheenRoughness: number; normalScale: number; envMapIntensity: number; };
  aluminum: { color: string; clearcoat: number; clearcoatRoughness: number; metalness: number; roughness: number; normalScale: number; envMapIntensity: number; };
  caliper: { clearcoat: number; clearcoatRoughness: number; metalness: number; roughness: number; envMapIntensity: number; };
  rubber: { roughness: number; metalness: number; envMapIntensity: number; }
  headlight: LightMaterialState;
  taillight: LightMaterialState;
  signal: LightMaterialState;
  licensePlate: LightMaterialState;
  glassCabin: { opacity: number; roughness: number; metalness: number; clearcoat: number; clearcoatRoughness: number; envMapIntensity: number; };
  glassLights: { transmission: number; opacity: number; ior: number; thickness: number; metalness: number; roughness: number; clearcoat: number; clearcoatRoughness: number; envMapIntensity: number; };
  camera: { fov: number; positionX: number; positionY: number; positionZ: number; targetX: number; targetY: number; targetZ: number; };
  post: { exposure: number; toneMapping: THREE.ToneMapping; };
  //plastic:
  //glass:
  
  setTweaks: (category: Category, params: Record<string, unknown>) => void;
}

export const useLevaStore = create<LevaState>()(
  subscribeWithSelector((set) => ({
    environment: {
      envIntensity: 0.8,
      envScale: 47,
      lightformerTop: 0.5,
      lightformerSide: 1.5,
      lightformerFront: 2.0,
      lightformerRear: 0.5,
      lightformerTopScale: 5,
      lightformerSideScale: 20,
      lightformerFrontScale: 15,
      lightformerRearScale: 3,
      dynamic: {
        enabled: true,
        showHelper: false,
        intensity: 0.5,
        positionX: 5,
        positionY: 8,
        positionZ: 3,
        shadowBias: -0.0005,
        shadowNormalBias: 0.04,
        shadowMapSize: 2048,
        shadowCameraSize: 2.5,
      },
      interior: {
        enabled: true,
        showHelper: false,
        ambientIntensity: 0.02, // Drastically reduced ambient light
        // STEP 1 (light-linking fix): moved off the header/roofline and narrowed
        // so the cone never grazes the windshield/door glass -> no more specular "dot"
        // reflected in Material_Glass_Cabin_Static. Explicit target (world-space) replaces
        // the old rotation+local-offset aiming, so position and aim are independent and
        // directly Leva-tunable.
        // STEP 2 (balance pass): ceiling was overpowering the center and, at Y:1.3,
        // was poking above the physical roof shell near the windshield header -> confirmed
        // fix is Y:1.2 (below the headliner). Pane lights were dying within ~20cm of the
        // source (distance too short) so door cards / floor mats never picked up any light -
        // that's the actual bug, not the position. Aim now targets low (sill/floor height),
        // which is structurally safe from the glass: the glazed area starts above the
        // beltline, so anything aimed at floor level geometrically cannot graze the window
        // regardless of angle.
        ceiling: {
          enabled: true, 
          intensity: 1.6,
          positionX: 0,
          positionY: 1.2,    
          positionZ: 0.1,      
          targetX: 0,
          targetY: 0.5,
          targetZ: -0.15,
          angle: 1.08,         
          penumbra: 0.9,
          distance: 1.6,
          decay: 2,
        },
        leftPane: {
          enabled: true,
          intensity: 1.1,
          positionX: 0.42,
          positionY: 1.15,
          positionZ: 0.1,
          targetX: 0.55,    
          targetY: 0.15, 
          targetZ: 0.15,
          angle: 1.09, 
          penumbra: 1.0,     
          distance: 2.0, 
          decay: 1.0,
        },
        rightPane: {
          enabled: true,
          intensity: 1.1,
          positionX: -0.42,
          positionY: 1.15,
          positionZ: 0.1,
          targetX: -0.55,
          targetY: 0.15,
          targetZ: 0.15,
          angle: 1.09,
          penumbra: 1.0,
          distance: 2.0,
          decay: 1.0,
        }
      },
    },
    paintSolid: { clearcoat: 1.0, clearcoatRoughness: 0.15, metalness: 0.4, roughness: 0.8, envMapIntensity: 1.0 },
    paintMetallic: { 
      clearcoat: 1.0, 
      clearcoatRoughness: 0.0, 
      metalness: 0.8, 
      roughness: 0.4, 
      envMapIntensity: 1.0,
      flakeScale: 10.0, 
      flakeIntensity: 0.05
    },
    paintSpecial: { clearcoat: 1.0, clearcoatRoughness: 0.0, metalness: 0.8, roughness: 0.4, envMapIntensity: 1.0 },
    carbonTwill: { color: '#0a0a0a', clearcoat: 1.0, clearcoatRoughness: 0.0, metalness: 0.6, roughness: 1.0, normalScale: 1.0, envMapIntensity: 1.0 },
    carbonForged: { color: '#0a0a0a', clearcoat: 1.0, clearcoatRoughness: 0.0, metalness: 0.6, roughness: 1.0, normalScale: 1.0, envMapIntensity: 1.0 },
    metal: { clearcoat: 1.0, clearcoatRoughness: 0.15, metalness: 0.97, roughness: 0.5, envMapIntensity: 2.0 },
    leather: { roughness: 1.0, metalness: 0.10, clearcoat: 0.06, clearcoatRoughness: 0.60, sheen: 0.2, sheenRoughness: 0.6, normalScale: 1.3, envMapIntensity: 0.6 },
    aluminum: { color: '#a8a8a8', clearcoat: 0.0, clearcoatRoughness: 0.0, metalness: 1.0, roughness: 0.40, normalScale: 0.5, envMapIntensity: 1.0 },
    caliper: { clearcoat: 1.0, clearcoatRoughness: 0.05, metalness: 0.1, roughness: 0.15, envMapIntensity: 1.2 },
    rubber: { roughness: 0.95, metalness: 0.0, envMapIntensity: 0.1 },
    headlight: { color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 1.0, roughness: 1.0, metalness: 0.0, ior: 1.5, envMapIntensity: 1.0 },
    taillight: { color: '#d30000', emissive: '#ff0000', emissiveIntensity: 2.5, roughness: 1.0, metalness: 0.0, ior: 1.5, envMapIntensity: 1.0 },
    signal: { color: '#ff9900', emissive: '#ff6600', emissiveIntensity: 2.0, roughness: 1.0, metalness: 0.0, ior: 1.5, envMapIntensity: 1.0 },
    licensePlate: { color: '#edf2ff', emissive: '#edf2ff', emissiveIntensity: 1.5, roughness: 1.0, metalness: 0.0, ior: 1.5, envMapIntensity: 1.0 },
    glassCabin: { opacity: 0.92, roughness: 0.0, metalness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.0, envMapIntensity: 0.9 },
    glassLights: { transmission: 0.0, opacity: 0.37, ior: 2.22, thickness: 0.00, metalness: 0.0, roughness: 0.0, clearcoat: 1.0, clearcoatRoughness: 0.5, envMapIntensity: 1.4 },
    camera: { fov: 35, positionX: 2.156, positionY: 1.250, positionZ: 5.333, targetX: 0, targetY: 0.2, targetZ: 0 },
    post: { exposure: 1.0, toneMapping: THREE.ACESFilmicToneMapping as THREE.ToneMapping },

    
    setTweaks: (category, params) => set((state) => {
      invalidate(); // Frame loop demand
      return { [category]: { 
      ...(state[category as keyof LevaState] as Record<string, unknown>), 
      ...params 
    } };
    }),
  }))
);