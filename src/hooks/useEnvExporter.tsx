import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { EXRExporter } from 'three/addons/exporters/EXRExporter.js';
import * as THREE from 'three';

export function useEnvExporter() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === 'E' && e.shiftKey) {
        console.log('[EnvExporter] Inizio baking EXR...');

        // Salviamo lo sfondo precedente per ripristinarlo
        const prevBg = scene.background;
        scene.background = new THREE.Color(0x000000);

        try {
          const pmremGenerator = new THREE.PMREMGenerator(gl);
          pmremGenerator.compileEquirectangularShader();
          
          // Genera il RenderTarget PMREM dalla scena corrente
          const renderTarget = pmremGenerator.fromScene(scene);

          const exporter = new EXRExporter();
          const exrData = await exporter.parse(gl, renderTarget, {
            type: THREE.HalfFloatType,
          });

          // Creazione e download automatico
          const blob = new Blob([exrData as BlobPart], { type: 'image/x-exr' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'studio_prebaked.exr';
          a.click();

          // Cleanup memory
          URL.revokeObjectURL(url);
          renderTarget.dispose();
          pmremGenerator.dispose();
          
          console.log('[EnvExporter] Bake completato. Salva il file in public/textures/');
        } catch (error) {
          console.error('[EnvExporter] Errore durante il baking:', error);
        } finally {
          scene.background = prevBg;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gl, scene]);
}