import { useState, useEffect, useRef } from 'react';
import { Texture } from 'three';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { useThree } from '@react-three/fiber';

// Singleton instance of KTX2Loader to avoid multiple instantiations with useless overhead.
// Loading a KTX2Loader is expensive
let ktx2LoaderInstance: KTX2Loader | null = null;

// INPUT: url of the KTX2 texture to load
// OUTPUT: the loaded texture or null if not yet loaded or if an error occurred
export const useKtx2Disposal = (url: string): Texture | null => {

  const [texture, setTexture] = useState<Texture | null>(null);
  
  // Get the WebGL renderer
  const gl = useThree((state) => state.gl);
  
  //Ref to track the current texture in use in the cycle of the component
  const currentTextureRef = useRef<Texture | null>(null);

  useEffect(() => {
    // Initialization of the KTX2Loader lazy
    if (!ktx2LoaderInstance) {
      ktx2LoaderInstance = new KTX2Loader();
      ktx2LoaderInstance.setTranscoderPath('/basis/');
      // Reveal the hardware extensions supported by the user's GPU (ASTC, BC7, etc.)
      ktx2LoaderInstance.detectSupport(gl);
    }

    let isMounted = true;

    //Asynchronously load the KTX2 texture
    ktx2LoaderInstance.load(
      url,
      (loadedTexture) => {
        // If the component is unmounted before the texture is loaded, we dispose of it immediately
        if (!isMounted) {
          loadedTexture.dispose();
          return;
        }

        // Dispose the previous texture if it exists to free up GPU memory
        if (currentTextureRef.current) {
          currentTextureRef.current.dispose();
        }

        // Update the ref and state with the newly loaded texture
        currentTextureRef.current = loadedTexture;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error(`[useKtx2Disposal] KTX2 Pipeline Failed on URL: ${url}`, error);
      }
    );

    // CLEANUP: executed when the component is unmounted or when the URL changes
    return () => {
      isMounted = false; 
      
      // Clean memory
      if (currentTextureRef.current) {
        currentTextureRef.current.dispose();
        currentTextureRef.current = null;
      }
      setTexture(null);
    };
  }, [url, gl]); //Only when url or gl changes.

  return texture;
};