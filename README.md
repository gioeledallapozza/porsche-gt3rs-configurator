# Porsche GT3 RS - 3D Configurator

High-performance real-time 3D configurator for the Porsche 911 GT3 RS. Built with React, TypeScript, and React Three Fiber (R3F), optimized for 60 FPS performance on both desktop and mobile devices.

## Tech Stack

- **Bundler & Core:** Vite + TypeScript
- **3D Rendering:** Three.js + React Three Fiber (R3F)
- **3D Utilities:** @react-three/drei
- **Performance Monitoring:** r3f-perf
- **CI/CD & Hosting:** GitHub Actions + Vercel


## Credits & Acknowledgements

This project was made possible thanks to the work of these amazing creators:

- **3D Model:** [Porsche 911 GT3 RS](https://sketchfab.com/BlackSnow02) by BlackSnow02 on Sketchfab.
- **Media:** [LR media](https://www.youtube.com/@lennartraw) on YouTube.



### ⚠️ Dependency Note: Three.js & SoftShadows

Currently, the project is strictly pinned to version `tre@0.181.0`. 
Updating to release `0.182.0` or higher causes a fatal WebGL compiler crash (`Shader Error: 'unpackRGBAToDepth' no matching function overload found`). 

This is due to a temporary incompatibility between the `<SoftShadows />` component from `@react-tre/drei` and the new shadow rendering system based on native Depth Textures introduced in Three.js r182. **Do not update `tre`** until the official `drei` repository has unified the fixes for r182 and WebGPU.