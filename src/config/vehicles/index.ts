import type { VehicleConfig } from '../types';
import { gt3rsConfig } from './gt3rs.config';

//Main register to access in o(1) to the configuration of the vehicles
export const vehicleRegistry: Record<string, VehicleConfig> = {
  [gt3rsConfig.id]: gt3rsConfig,
   //In future: 'gt4rs: gt4rsConfig etc...
};

export type AvailableVehicles = keyof typeof vehicleRegistry;