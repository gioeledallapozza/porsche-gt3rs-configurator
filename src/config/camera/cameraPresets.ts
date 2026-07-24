export interface CameraPreset {
  id: string;
  name: string;
  position: [number, number, number];
  target: [number, number, number];
  thumbnail: string;

  minDistance?: number;
  maxDistance?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number; 
  minAzimuthAngle?: number; 
  maxAzimuthAngle?: number; 
}

export const cameraPresets: CameraPreset[] = [
  { 
    id: 'hero_view', 
    name: 'Front 3/4', 
    position: [3.5, 1.5, 4.5], 
    target: [0, 0.2, 0], 
    thumbnail: '/placeholders/cam-front-34.webp' 
  },
  { 
    id: 'wheel_close', 
    name: 'Wheel Detail', 
    position: [2.0, 0.5, 1.5], 
    target: [0.9, 0.4, 1.2], 
    thumbnail: '/placeholders/cam-wheel.webp',
    
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
];