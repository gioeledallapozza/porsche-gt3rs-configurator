export interface CameraPreset {
  id: string;
  name: string;
  position: [number, number, number];
  target: [number, number, number];
  thumbnail: string;
  fov?: number;

  minDistance?: number;
  maxDistance?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number; 
  minAzimuthAngle?: number; 
  maxAzimuthAngle?: number; 
}

export const cameraPresets: CameraPreset[] = [
  { 
    id: 'debug_view', 
    name: 'Free Roam (Debug)', 
    position: [0.0, 1.2, 2.0], 
    target: [0.0, 1.2, 0.0], 
    thumbnail: '', // Nessuna immagine, è solo per noi
    
    // NESSUN LIMITE
    minDistance: 0.01,
    maxDistance: 100,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI, 
  },
  { 
    id: 'hero_view', 
    name: 'Front 3/4', 
    position: [2.153, 1.421, 5.297], 
    target: [0, 0.2, 0], 
    thumbnail: '/placeholders/cam-front-34.webp',
    fov: 35
  },
  { 
    id: 'wheel_close', 
    name: 'Wheel Detail', 
    position: [2.0, 0.5, 1.5], 
    target: [0.9, 0.4, 1.2], 
    thumbnail: '/placeholders/cam-wheel.webp',
    fov: 45,
    
    minDistance: 1.5,
    maxDistance: 2.5,
    maxPolarAngle: Math.PI / 2 - 0.1,
    minAzimuthAngle: Math.PI / 4,
    maxAzimuthAngle: Math.PI / 1.5
  },
  { 
    id: 'rear_34', 
    name: 'Rear 3/4', 
    position: [-3.5, 1.5, -4.5], 
    target: [0, 0.5, 0], 
    thumbnail: '/placeholders/cam-rear-34.webp' 
  },
  { 
    id: 'rear_straight', 
    name: 'Rear Straight', 
    position: [0.0, 1.2, -5.0], 
    target: [0, 0.6, 0], 
    thumbnail: '/placeholders/cam-rear.webp' 
  },
  { 
    id: 'top_down', 
    name: 'Top Down', 
    position: [0.0, 6.0, 0.0], 
    target: [0, 0.0, 0], 
    thumbnail: '/placeholders/cam-top.webp' 
  },
  { 
    id: 'aero_wing', 
    name: 'Rear Wing', 
    position: [-1.5, 2.0, -3.0], 
    target: [0.0, 1.2, -2.0], 
    thumbnail: '/placeholders/cam-wing.webp' 
  },
  { 
    id: 'interior_view', 
    name: 'Interior', 
    // position: [0.223, 1.112, -0.505], 
    // target: [-0.132, 0.507, 0.965], 
    position: [0.0, 1.150, -0.450],
    target: [0.0, 1.145, -0.441], 

    thumbnail: '/placeholders/cam-interior.webp',
    fov: 70,
    
    //Low zoom scrooll
    minDistance: 0.01,
    maxDistance: 0.01,
    
    // Vertical rotation limits (Polar)
    minPolarAngle: Math.PI / 3,    
    maxPolarAngle: Math.PI / 1.5,
    
  },
  // { 
  //   id: 'interior_rear_view', 
  //   name: 'Interior Seats & Belts', 
  //   position: [0.350, 1.150, 0.150], 
  //   target: [0.340, 1.100, 0.140], 
  //   thumbnail: '/placeholders/cam-interior-rear.webp',
  //   fov: 70,

  //   minDistance: 0.01,
  //   maxDistance: 0.01,
    
  //   minPolarAngle: Math.PI / 2.5,
  //   maxPolarAngle: Math.PI / 1.5,

  //   minAzimuthAngle: -0.2, 
  //   maxAzimuthAngle: Math.PI / 1.5,
  // }
];