export interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

export type PaintFinish = 'solid' | 'metallic' | 'special';
export type PaintCategory = 'standard' | 'pts';

export interface PaintOption {
  name: string;
  hex: string;
  finish: PaintFinish;
  category?: PaintCategory;
}

export interface PackageOption {
  id: string;
  label: string;
  description?: string;
  thumbnailUrl?: string;
  hexFallback?: string;
}

export interface VehicleConfig {
  id: string;
  modelPath: string;
  texturePack: Record<string, string>; // KTX2 path, free key for vehicle — consumed by useKtx2Disposal
  
  paintOptions: PaintOption[];
  aeroOptions: PackageOption[];
  wheelOptions: ColorOption[];
  caliperOptions: ColorOption[];
  
  interiorColorOptions: ColorOption[];
  interiorTrimOptions: PackageOption[]; 
  stitchingOptions: ColorOption[];
  seatbeltOptions: ColorOption[];
}
