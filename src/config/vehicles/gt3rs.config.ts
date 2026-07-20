import type { VehicleConfig } from '../types';

export const gt3rsConfig: VehicleConfig = {
  id: 'gt3rs',
  modelPath: '/models/gt3rs/scene.glb',
  paintOptions: [
    { name: 'Guards Red', hex: '#d32f2f', finish: 'solid' },
    { name: 'Shark Blue', hex: '#0277bd', finish: 'solid' },
    { name: 'Chalk', hex: '#e0e0e0', finish: 'solid' },
    { name: 'Solid Black', hex: '#000000', finish: 'solid' },
    { name: 'Jet Black Metallic', hex: '#111111', finish: 'metallic' },
    { name: 'Oak Green Neo', hex: '#2f3b33', finish: 'metallic' },
    { name: 'Gentian Blue', hex: '#101835', finish: 'metallic' },
    { name: 'Python Green Chromaflair', hex: '#f0f00b', finish: 'special' }
  ],
  aeroOptions: [
    { id: 'standard', label: 'Standard (Painted Body Color)' },
    { id: 'weissach', label: 'Weissach Package (Twill Carbon)' },
    { id: 'weissach_forged', label: 'Weissach Package (Forged Carbon)' }
  ]
};