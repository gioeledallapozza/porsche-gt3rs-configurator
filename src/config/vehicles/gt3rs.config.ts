import type { VehicleConfig } from '../types';

export const gt3rsConfig: VehicleConfig = {
  id: 'gt3rs',
  modelPath: '/models/gt3rs/scene.glb',
  paintOptions: [
    { name: 'Guards Red', hex: '#d32f2f' },
    { name: 'Chalk', hex: '#e0e0e0' },
    { name: 'Solid Black', hex: '#000000' },
    { name: 'Jet Black Metallic', hex: '#111111' },
    { name: 'Oak Green Neo', hex: '#2f3b33' },
    { name: 'Gentian Blue', hex: '#101835' }
  ],
  aeroOptions: [
    { id: 'standard', label: 'Standard (Painted Body Color)' },
    { id: 'weissach', label: 'Weissach Package (Twill Carbon)' },
    { id: 'weissach_forged', label: 'Weissach Package (Forged Carbon)' }
  ]
};