import type { VehicleConfig } from '../types';

export const gt3rsConfig: VehicleConfig = {
  id: 'gt3rs',
  modelPath: '/models/gt3rs/scene.glb',
  paintOptions: [

    // --- STANDARD ---
    { name: 'Guards Red', hex: '#d32f2f', finish: 'solid', category: 'standard' },
    { name: 'Shark Blue', hex: '#0277bd', finish: 'solid', category: 'standard' },
    { name: 'White', hex: '#f0f0f0', finish: 'solid', category: 'standard' },
    { name: 'Black', hex: '#0a0a0a', finish: 'solid', category: 'standard' },
    { name: 'Racing Yellow', hex: '#f7d117', finish: 'solid', category: 'standard' },

    // --- Metallic ---
    { name: 'Jet Black Metallic', hex: '#111111', finish: 'metallic', category: 'standard' },
    { name: 'GT Silver Metallic', hex: '#888C8D', finish: 'metallic', category: 'standard' },
    { name: 'Agate Grey Metallic', hex: '#595B5A', finish: 'metallic', category: 'standard' },
    { name: 'Oak Green Neo', hex: '#2B5331', finish: 'metallic', category: 'standard' },
    { name: 'Gentian Blue', hex: '#1C3683', finish: 'metallic', category: 'standard' },

    // --- SPECIAL ---
    { name: 'Python Green Chromaflair', hex: '#f0f00b', finish: 'special', category: 'standard' },

    // --- EXCLUSIVE MANUFAKTUR (PAINT TO SAMPLE - PTS) ---
    
    // Greys and Neutrals
    { name: 'Ivory', hex: '#E6E3CF', finish: 'solid', category: 'pts' },
    { name: 'Chalk', hex: '#D1D1CF', finish: 'solid', category: 'pts' },
    { name: 'Sport Classic Grey', hex: '#898D8E', finish: 'solid', category: 'pts' },
    { name: 'Fashion Grey', hex: '#8E8F8B', finish: 'solid', category: 'pts' },
    { name: 'Nardo Grey', hex: '#686A6C', finish: 'solid', category: 'pts' },
    { name: 'Slate Grey', hex: '#4D5355', finish: 'solid', category: 'pts' },
    
    // Yellow
    { name: 'Speed Yellow', hex: '#F0D722', finish: 'solid', category: 'pts' },
    { name: 'Signal Yellow', hex: '#F2A900', finish: 'solid', category: 'pts' },
    { name: 'Bahama Yellow', hex: '#E29F1D', finish: 'solid', category: 'pts' },
    
    // Orange
    { name: 'Tangerine', hex: '#E44A1C', finish: 'solid', category: 'pts' },
    { name: 'Lava Orange', hex: '#FF5B00', finish: 'solid', category: 'pts' },
    
    // Red
    { name: 'Ruby Star', hex: '#C83C55', finish: 'solid', category: 'pts' },
    { name: 'Carmine Red', hex: '#9C151C', finish: 'solid', category: 'pts' },
    { name: 'Arena Red Metallic', hex: '#6B2329', finish: 'metallic', category: 'pts' },
    { name: 'Amaranth Red Metallic', hex: '#8A2E3B', finish: 'metallic', category: 'pts' },
    { name: 'Pascha Red', hex: '#701B22', finish: 'solid', category: 'pts' },
    
    // Purple
    { name: 'Ultraviolet', hex: '#4B3B5C', finish: 'solid', category: 'pts' },
    { name: 'Amethyst Metallic', hex: '#5A3B5C', finish: 'metallic', category: 'pts' },
    { name: 'Viola Metallic', hex: '#4A3B52', finish: 'metallic', category: 'pts' },
    { name: 'Aubergine', hex: '#3D2935', finish: 'solid', category: 'pts' },
    
    // Blues and Azures
    { name: 'Meissen Blue', hex: '#88A3B8', finish: 'solid', category: 'pts' },
    { name: 'Azzurro Thetys Metallic', hex: '#8B9FB0', finish: 'metallic', category: 'pts' },
    { name: 'Gulf Blue', hex: '#99C1D9', finish: 'solid', category: 'pts' },
    { name: 'Riviera Blue', hex: '#2583BA', finish: 'solid', category: 'pts' },
    { name: 'Miami Blue', hex: '#007A9B', finish: 'solid', category: 'pts' },
    { name: 'Oslo Blue', hex: '#295A76', finish: 'solid', category: 'pts' },
    { name: 'Voodoo Blue', hex: '#005BAA', finish: 'solid', category: 'pts' },
    { name: 'Maritime Blue', hex: '#1C4587', finish: 'solid', category: 'pts' },
    { name: 'Arrow Blue', hex: '#103A71', finish: 'solid', category: 'pts' },
    
    // Greens
    { name: 'Acid Green', hex: '#8DB600', finish: 'solid', category: 'pts' },
    { name: 'Mint Green', hex: '#2CA089', finish: 'solid', category: 'pts' },
    { name: 'Signal Green', hex: '#2CA05A', finish: 'solid', category: 'pts' },
    { name: 'Irish Green', hex: '#194A2D', finish: 'solid', category: 'pts' },
    { name: 'British Racing Green', hex: '#004225', finish: 'solid', category: 'pts' },
    { name: 'Oak Green Metallic', hex: '#3A4B38', finish: 'metallic', category: 'pts' },
    { name: 'Jet Green Metallic', hex: '#23322A', finish: 'metallic', category: 'pts' },
    { name: 'Brewster Green', hex: '#1B2A21', finish: 'solid', category: 'pts' },
    
    // Darks/Earths
    { name: 'Black Olive', hex: '#38362D', finish: 'solid', category: 'pts' }
  ],
  aeroOptions: [
    { id: 'standard', label: 'Standard (Painted Body Color)' },
    { id: 'weissach', label: 'Weissach Package (Twill Carbon)' },
    { id: 'weissach_forged', label: 'Weissach Package (Forged Carbon)' }
  ],
  wheelOption: [
    { id: 'silver', name: 'Standard Silver Alloy', hex: '#6C6F74' },
    { id: 'gold', name: 'Satin Aurum', hex: '#7F6B46' }
  ],
  caliperOptions: [
    { id: 'red', name: 'Guards Red (Steel Brakes)', hex: '#d32f2f' },
    { id: 'yellow', name: 'Speed Yellow (PCCB)', hex: '#f0d722' },
    { id: 'green', name: 'Acid Green (Hybrid)', hex: '#87d30f' },
    { id: 'black', name: 'High Gloss Black', hex: '#111111' }
  ]
};