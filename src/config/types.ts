export type PaintFinish = 'solid' | 'metallic' | 'special';

export interface PaintOption {
  name: string;
  hex: string;
  finish: PaintFinish;
}

export interface PackageOption {
  id: string;
  label: string;
  description?: string;
}

export interface WheelOption {
  id: string;
  name: string;
  hex: string;
}

export interface CaliperOption {
  id: string;
  name: string;
  hex: string;
}

export interface VehicleConfig {
  id: string;
  modelPath: string;
  paintOptions: PaintOption[];
  aeroOptions: PackageOption[];
  wheelOption: WheelOption[];
  caliperOptions: CaliperOption[];
}
