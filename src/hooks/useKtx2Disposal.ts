import { useEffect } from 'react';
import { Texture } from 'three';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { useThree } from '@react-three/fiber';

// Singleton instance of KTX2Loader to avoid multiple instantiations with useless overhead.
// Loading a KTX2Loader is expensive
let ktx2LoaderInstance: KTX2Loader | null = null;

//Global cache to handle the SUSPENSE of REACT
const textureCache = new Map<string, Texture | Promise<Texture>>();

// INPUT: url of the KTX2 texture to load
// OUTPUT: the loaded texture or null if not yet loaded or if an error occurred
export const useKtx2Disposal = (url: string): Texture => {
  
  // Get the WebGL renderer
  const gl = useThree((state) => state.gl);

  if (!ktx2LoaderInstance) {
    ktx2LoaderInstance = new KTX2Loader();
    ktx2LoaderInstance.setTranscoderPath('/basis/');
    ktx2LoaderInstance.detectSupport(gl);
  }

  let cached = textureCache.get(url);

  //If there is not in cache create the promise and suspense
  if (!cached) {
    const promise = new Promise<Texture>((resolve, reject) => {
      ktx2LoaderInstance!.load(
        url,
        (loadedTexture) => {
          textureCache.set(url, loadedTexture);
          resolve(loadedTexture);
        },
        undefined,
        (error) => {
          textureCache.delete(url);
          console.error(`[useKtx2Disposal] Pipeline Failed on URL: ${url}`, error);
          reject(error);
        }
      );
    });
    textureCache.set(url, promise);
    throw promise; 
  }

  //If is still loading throw promise
  if (cached instanceof Promise) {
    throw cached;
  }
 
  useEffect(() => {
    return () => {
      if (cached && !(cached instanceof Promise)) {
        cached.dispose();
        textureCache.delete(url);
      }
    };
  }, [url, cached]);

  return cached as Texture;
};