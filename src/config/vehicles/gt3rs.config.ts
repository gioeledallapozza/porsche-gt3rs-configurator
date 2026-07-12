import type { VehicleConfig } from '../types';

export const gt3rsConfig: VehicleConfig = {
  id: 'gt3rs',
  modelPath: '/models/gt3rs/scene.glb',
  paintOptions: [
    { name: 'Guards Red', hex: '#d32f2f' },
    { name: 'Shark Blue', hex: '#0277bd' },
    { name: 'Chalk', hex: '#e0e0e0' },
    { name: 'Black', hex: '#000000' }
  ],
  aeroOptions: [
    { id: 'standard', label: 'Standard (Painted Body Color)' },
    { id: 'weissach', label: 'Weissach Package (Exposed Carbon)' }
  ]
};