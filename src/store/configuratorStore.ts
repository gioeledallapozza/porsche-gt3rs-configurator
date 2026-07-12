import { create } from 'zustand';

//This store manages the state of the car configurator.
interface ConfiguratorState {
  //Only primite types
  carColor: string;
  wheelType: string;
  activeCameraPreset: string;
  aeroPackage: string;
  
  // Actions
  setCarColor: (hex: string) => void;
  setWheelType: (id: string) => void;
  setActiveCameraPreset: (id: string) => void;
  setAeroPackage: (id: string) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  carColor: '#d32f2f', // Default to Guards Red
  wheelType: 'standard_alloy',
  activeCameraPreset: 'hero_view',
  aeroPackage: 'standard',

  setCarColor: (hex) => set({ carColor: hex }),
  setWheelType: (id) => set({ wheelType: id }),
  setActiveCameraPreset: (id) => set({ activeCameraPreset: id }),
  setAeroPackage: (id) => set({ aeroPackage: id }),
}));