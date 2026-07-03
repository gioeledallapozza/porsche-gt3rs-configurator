import type { VehicleConfig } from '../types';
import { gt3rsConfig } from './gt3rs.config';

//Main register to access in o(1) to the configuration of the vehicles
export const vehicleRegistry: Record<string, VehicleConfig> = {
  [gt3rsConfig.id]: gt3rsConfig,
   //In future: 'gt4rs: gt4rsConfig etc...
   //The scope of the project IS ONLY GT3RS but the architecture is designed to be scalable and support multiple vehicles in the future.
};

export type AvailableVehicles = keyof typeof vehicleRegistry;