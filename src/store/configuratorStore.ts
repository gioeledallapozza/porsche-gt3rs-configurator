import { create } from 'zustand';
import { gt3rsConfig } from '@/config/vehicles/gt3rs.config';

//This store manages the state of the car configurator.
interface ConfiguratorState {
  //Only primite types
  carColor: string;
  wheelColor: string;
  caliperColor: string;
  activeCameraPreset: string;
  aeroPackage: string;
  
  // Actions
  setCarColor: (hex: string) => void;
  setWheelColor: (hex: string) => void;
  setCaliperColor: (hex: string) => void;
  setActiveCameraPreset: (id: string) => void;
  setAeroPackage: (id: string) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  carColor: gt3rsConfig.paintOptions[0].hex, //NOT WORKING FOR OTHER CARS DIFFERENT FROM GT3RS TO FIX
  wheelColor: gt3rsConfig.wheelOption[0].hex,
  caliperColor: gt3rsConfig.caliperOptions[0].hex,
  activeCameraPreset: 'hero_view',
  aeroPackage: 'standard',

  setCarColor: (hex) => set({ carColor: hex }),
  setWheelColor: (hex) => set({ wheelColor: hex }),
  setCaliperColor: (hex) => set({ caliperColor: hex }),
  setActiveCameraPreset: (id) => set({ activeCameraPreset: id }),
  setAeroPackage: (id) => set({ aeroPackage: id }),
}));