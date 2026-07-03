export interface PaintOption {
  name: string;
  hex: string;
}

export interface VehicleConfig {
  id: string;
  modelPath: string;
  paintOptions: PaintOption[];
}
