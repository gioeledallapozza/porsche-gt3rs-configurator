# 🏎️ Porsche 911 GT3 RS - WebGL 3D Configurator

An enterprise-grade, real-time 3D configurator for the Porsche 911 GT3 RS. 
Built from scratch focusing on high performance, photorealistic materials, and seamless UX across desktop and mobile devices.

![Configurator Preview](preview/preview.webp)

## ✨ Core Features
*   **High-Performance Rendering:** Optimized for steady 60 FPS, maintaining visual fidelity without frying mobile GPUs.
*   **Seamless Camera Transitions:** Custom transition manager masking viewpoint changes (Exterior <-> Interior) with synchronized fade overlays.
*   **Dynamic Studio Lighting:** Discoupled lighting systems for exterior and interior. Lights are pre-loaded and dynamically scaled to eliminate shader compilation stutter.
*   **Smart Hotspots & Auto-Focus:** UI interactions (e.g., changing seatbelt colors) automatically trigger camera animations to the optimal viewing angle.

## 🛠️ Tech Stack
*   **Core:** React + TypeScript + Vite
*   **3D Engine:** Three.js + React Three Fiber (R3F)
*   **3D Utilities:** `@react-three/drei`
*   **Performance Monitoring:** `r3f-perf`

---

## 📦 Asset Pipeline & Optimization

To achieve fast loading times (under 7s on mid-range mobile devices), this project relies on a strict asset optimization pipeline.

### 1. 3D Models (`gltfjsx`)
The base model is processed via `gltfjsx` to generate declarative React components, allowing imperative control over materials, geometry, and shadow properties directly in the JSX.
Run the generator using:
```bash
npm run generate
```

### 2. Texture Compression (KTX2)
Textures are heavily compressed into the `KTX2` format (UASTC/ETC1S) to drastically reduce VRAM usage and network payload. 
The custom compression script (`scripts/compressTextures.js`) uses `toktx`.

**How to use the compression script:**
Currently, the script is configured manually per folder. To compress a new batch of textures:
1. Open the script.
2. Update the `RAW_DIR` and `OUT_DIR` variables to target your specific texture folder.
3. Run the script:
```bash
npm run compress
```

---

## ⚠️ Important Technical Notes (Gotchas)

### 1. Three.js r182 & SoftShadows Crash
Currently, the project is strictly pinned to version `three@0.181.0`. 
Updating to release `0.182.0` or higher causes a fatal WebGL compiler crash (`Shader Error: 'unpackRGBAToDepth' no matching function overload found`). This is due to an ongoing incompatibility between the `<SoftShadows />` component from `@react-three/drei` and the new native Depth Textures system introduced in r182. 
**Do not update `three` until the official `drei` repository patches this for WebGPU/r182.**

### 2. KTX2 Compression on Normal Maps
When compressing Normal Maps using `toktx`, **do not use the `--normal_mode` flag**. 
The `--normal_mode` flag strips the Z-coordinate for optimization, assuming the shader will reconstruct it. However, Three.js's `MeshPhysicalMaterial` requires the Z-coordinate to correctly calculate light bounces. Using that flag will result in flat, broken materials. This script explicitly uses standard UASTC encoding for normal maps to preserve the Z-axis.

---

## 🚀 Local Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/porsche-configurator.git](https://github.com/yourusername/porsche-configurator.git)
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🤝 Credits & Acknowledgements
*   **3D Base Model:** [Porsche 911 GT3 RS by BlackSnow02](https://sketchfab.com/3d-models/porsche-911-gt3-rs-2023-black-c7c4581eaee646c29bd2287713437ca5) on Sketchfab.
*   **Media/HDRI References:** LR media on YouTube.
