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
  
  setTweaks: (category: Category, params: Partial<any>) => void;
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
    metal: { clearcoat: 1.0, clearcoatRoughness: 0.15, metalness: 0.97, roughness: 0.37, envMapIntensity: 2.0 },
    caliper: { clearcoat: 1.0, clearcoatRoughness: 0.05, metalness: 0.1, roughness: 0.15, envMapIntensity: 1.2 },
    rubber: { roughness: 0.95, metalness: 0.0, envMapIntensity: 0.1 },
    headlight: { color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 1.0, roughness: 1.0, metalness: 0.0, ior: 1.5, envMapIntensity: 1.0 },
    taillight: { color: '#d30000', emissive: '#ff0000', emissiveIntensity: 2.5, roughness: 1.0, metalness: 0.0, ior: 1.5, envMapIntensity: 1.0 },
    signal: { color: '#ff9900', emissive: '#ff6600', emissiveIntensity: 2.0, roughness: 1.0, metalness: 0.0, ior: 1.5, envMapIntensity: 1.0 },
    licensePlate: { color: '#edf2ff', emissive: '#edf2ff', emissiveIntensity: 1.5, roughness: 1.0, metalness: 0.0, ior: 1.5, envMapIntensity: 1.0 },
    glassCabin: { opacity: 0.92, roughness: 0.0, metalness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.0, envMapIntensity: 0.9 },
    glassLights: { transmission: 1.0, opacity: 1.0, ior: 1.0, thickness: 0.00, metalness: 0.0, roughness: 0.0, clearcoat: 1.0, clearcoatRoughness: 0.10, envMapIntensity: 1.0 },
    camera: { fov: 35, positionX: 3.5, positionY: 1.5, positionZ: 4.5, targetX: 0, targetY: 0.2, targetZ: 0 },
    post: { exposure: 1.0, toneMapping: THREE.ACESFilmicToneMapping as THREE.ToneMapping },

    
    setTweaks: (category, params) => set((state) => {
      invalidate(); // Frame loop demand
      return { [category]: { ...(state[category as keyof LevaState] as any), ...params } };
    }),
  }))
);