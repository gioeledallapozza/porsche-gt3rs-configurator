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
        angle: number;
        penumbra: number;
        distance: number;
      };
      leftPane: {
        enabled: boolean;
        intensity: number;
        positionX: number;
        positionY: number;
        positionZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
      };
      rightPane: {
        enabled: boolean;
        intensity: number;
        positionX: number;
        positionY: number;
        positionZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
      };
      dash: {
        enabled: boolean;
        intensity: number;
        positionX: number;
        positionY: number;
        positionZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
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
  leather: { roughness: number; metalness: number; clearcoat: number; sheen: number; sheenRoughness: number; envMapIntensity: number; };
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
        ceiling: {
          enabled: true, // Disabled the ceiling spotlight
          intensity: 2.4,
          positionX: 0,
          positionY: 1.3,
          positionZ: -0.1,
          angle: Math.PI / 2.5,
          penumbra: 1.0,
          distance: 1.7,
        },
        leftPane: {
          enabled: true,
          intensity: 0.8, // Reduced intensity
          positionX: 1.1, // Moved outside
          positionY: 0.9, // Raised
          positionZ: 0.2,
          rotationX: -Math.PI / 12, // Tilted down slightly
          rotationY: Math.PI / 2,
          rotationZ: 0,
        },
        rightPane: {
          enabled: true,
          intensity: 0.8, // Reduced intensity
          positionX: -1.1, // Moved outside
          positionY: 0.9, // Raised
          positionZ: 0.2,
          rotationX: -Math.PI / 12, // Tilted down slightly
          rotationY: -Math.PI / 2,
          rotationZ: 0,
        },
        dash: {
          enabled: true,
          intensity: 2.5, // Main key light
          positionX: 0,
          positionY: 1.2, // Raised above hood line
          positionZ: 1.6, // Moved outside windshield
          rotationX: -Math.PI / 8, // Tilted inwards
          rotationY: Math.PI, 
          rotationZ: 0,
        },
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
    leather: { roughness: 0.8, metalness: 0.0, clearcoat: 0.0, sheen: 0.1, sheenRoughness: 0.6, envMapIntensity: 1.0 },
    aluminum: { color: '#d4d4d4', clearcoat: 0.0, clearcoatRoughness: 0.0, metalness: 1.0, roughness: 1.0, normalScale: 0.5, envMapIntensity: 1.0 },
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