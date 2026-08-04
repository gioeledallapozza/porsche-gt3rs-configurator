import { create } from 'zustand';
import type { VehicleConfig } from '@/config/types';

//This store manages the state of the car configurator.
interface ConfiguratorState {
  // Setup flag
  isInitialized: boolean;
  isEnvReady: boolean;

  //Exterior
  carColor: string;
  wheelColor: string;
  caliperColor: string;
  aeroPackage: string;

  //Interior
  interiorTrimPackage: string; // 'exterior', 'carbon', 'plastic', 'aluminum'
  interiorColor: string;
  stitchingColor: string;
  seatbeltColor: string;

  activeCameraPreset: string;

  //Animations
  doorsOpen: boolean;
  hoodOpen: boolean;
  steeringTurned: boolean;

  // Setup Action
  initVehicle: (config: VehicleConfig) => void;
  setEnvReady: (status: boolean) => void;
  
  // Actions Exterior
  setCarColor: (hex: string) => void;
  setWheelColor: (hex: string) => void;
  setCaliperColor: (hex: string) => void;
  setActiveCameraPreset: (id: string) => void;
  setAeroPackage: (id: string) => void;

  // Actions Interior
  setInteriorTrimPackage: (id: string) => void;
  setInteriorColor: (hex: string) => void;
  setStitchingColor: (hex: string) => void;
  setSeatbeltColor: (hex: string) => void;

  // Actions Animations
  toggleDoors: () => void;
  toggleHood: () => void;
  toggleSteering: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  // Setup flag
  isInitialized: false,
  isEnvReady: false,

  //Exterior
  carColor: '', 
  wheelColor: '',
  caliperColor: '',
  aeroPackage: 'standard',

  //Interior
  interiorTrimPackage: 'carbon',
  interiorColor: '#0a0a0a',   // Nero standard
  stitchingColor: '#ffffff',  // Cuciture a contrasto grigie/bianche
  seatbeltColor: '#0a0a0a',

  activeCameraPreset: 'hero_view',

  doorsOpen: false,
  hoodOpen: false,
  steeringTurned: false,

  initVehicle: (config) => set({
    isInitialized: true,
    carColor: config.paintOptions[0]?.hex || '#000000',
    wheelColor: config.wheelOptions[0]?.hex || '#000000',
    caliperColor: config.caliperOptions[0]?.hex || '#000000',
    aeroPackage: config.aeroOptions[0]?.id || 'standard',

    interiorTrimPackage: config.interiorTrimOptions[0]?.id || 'carbon',
    interiorColor: config.interiorColorOptions[0]?.hex || '#0a0a0a',
    stitchingColor: config.stitchingOptions[0]?.hex || '#888C8D',
    seatbeltColor: config.seatbeltOptions[0]?.hex || '#0a0a0a',

    doorsOpen: false,
    hoodOpen: false,
    steeringTurned: false,
  }),
  setEnvReady: (status) => set({ isEnvReady: status }),

  //Actions Exterior
  setCarColor: (hex) => set({ carColor: hex }),
  setWheelColor: (hex) => set({ wheelColor: hex }),
  setCaliperColor: (hex) => set({ caliperColor: hex }),
  setActiveCameraPreset: (id) => set({ activeCameraPreset: id }),
  setAeroPackage: (id) => set({ aeroPackage: id }),

  //Actions Interiors
  setInteriorTrimPackage: (id) => set({ interiorTrimPackage: id }),
  setInteriorColor: (hex) => set({ interiorColor: hex }),
  setStitchingColor: (hex) => set({ stitchingColor: hex }),
  setSeatbeltColor: (hex) => set({ seatbeltColor: hex }),

  //Actions Animations
  toggleDoors: () => set((state) => ({ doorsOpen: !state.doorsOpen })),
  toggleHood: () => set((state) => ({ hoodOpen: !state.hoodOpen })),
  toggleSteering: () => set((state) => ({ steeringTurned: !state.steeringTurned })),
}));