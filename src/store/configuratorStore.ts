import { create } from 'zustand';
import type { VehicleConfig } from '@/config/types';

//This store manages the state of the car configurator.
interface ConfiguratorState {
  // Setup flag
  isInitialized: boolean;
  isEnvReady: boolean;

  //Only primite types
  carColor: string;
  wheelColor: string;
  caliperColor: string;
  activeCameraPreset: string;
  aeroPackage: string;

  //Animations
  doorsOpen: boolean;
  hoodOpen: boolean;
  steeringTurned: boolean;

  // Setup Action
  initVehicle: (config: VehicleConfig) => void;
  setEnvReady: (status: boolean) => void;
  
  // Actions
  setCarColor: (hex: string) => void;
  setWheelColor: (hex: string) => void;
  setCaliperColor: (hex: string) => void;
  setActiveCameraPreset: (id: string) => void;
  setAeroPackage: (id: string) => void;

  // Actions Animations
  toggleDoors: () => void;
  toggleHood: () => void;
  toggleSteering: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  isInitialized: false,
  isEnvReady: false,
  carColor: '', 
  wheelColor: '',
  caliperColor: '',
  activeCameraPreset: 'hero_view',
  aeroPackage: 'standard',

  doorsOpen: false,
  hoodOpen: false,
  steeringTurned: false,

  initVehicle: (config) => set({
    isInitialized: true,
    carColor: config.paintOptions[0]?.hex || '#000000',
    wheelColor: config.wheelOption[0]?.hex || '#000000',
    caliperColor: config.caliperOptions[0]?.hex || '#000000',

    doorsOpen: false,
    hoodOpen: false,
    steeringTurned: false,
  }),
  setEnvReady: (status) => set({ isEnvReady: status }),

  setCarColor: (hex) => set({ carColor: hex }),
  setWheelColor: (hex) => set({ wheelColor: hex }),
  setCaliperColor: (hex) => set({ caliperColor: hex }),
  setActiveCameraPreset: (id) => set({ activeCameraPreset: id }),
  setAeroPackage: (id) => set({ aeroPackage: id }),

  toggleDoors: () => set((state) => ({ doorsOpen: !state.doorsOpen })),
  toggleHood: () => set((state) => ({ hoodOpen: !state.hoodOpen })),
  toggleSteering: () => set((state) => ({ steeringTurned: !state.steeringTurned })),
}));