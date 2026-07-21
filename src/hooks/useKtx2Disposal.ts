import { useEffect } from 'react';
import { Texture, WebGLRenderer } from 'three';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { useThree } from '@react-three/fiber';

// Singleton instance of KTX2Loader to avoid multiple instantiations with useless overhead.
// Loading a KTX2Loader is expensive
let ktx2LoaderInstance: KTX2Loader | null = null;

// Chace entry must track active references to prevent premature disposal
interface CacheEntry {
  resource: Texture | Promise<Texture>;
  refCount: number;
}

//Global cache to handle the SUSPENSE of REACT
const textureCache = new Map<string, CacheEntry>();

// Factory function: isolate global mutation from the body hook
const getKTX2Loader = (gl: WebGLRenderer): KTX2Loader => {
  if (!ktx2LoaderInstance) {
    ktx2LoaderInstance = new KTX2Loader();
    ktx2LoaderInstance.setTranscoderPath('/basis/');
    ktx2LoaderInstance.detectSupport(gl);
  }
  return ktx2LoaderInstance;
};

// INPUT: url of the KTX2 texture to load
// OUTPUT: the loaded texture or null if not yet loaded or if an error occurred
export const useKtx2Disposal = (url: string): Texture => {
  
  // Get the WebGL renderer
  const gl = useThree((state) => state.gl);

  const loader = getKTX2Loader(gl);

  let entry = textureCache.get(url);

  //If there is not in cache create the promise and suspense
  if (!entry) {
    const promise = new Promise<Texture>((resolve, reject) => {
      loader.load(
        url,
        (loadedTexture) => {
          const currentEntry = textureCache.get(url);
          if (currentEntry) {
            textureCache.set(url, { resource: loadedTexture, refCount: currentEntry.refCount });
          }
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

    entry = { resource: promise, refCount: 0 };
    textureCache.set(url, entry);
    throw promise;
  }

  //If is still loading throw promise
  if (entry.resource instanceof Promise) {
    throw entry.resource;
  }
 
  // mount/unmount phase 
  useEffect(() => {
    const currentEntry = textureCache.get(url);
    if (currentEntry) {
      currentEntry.refCount += 1; // Increment on mount
    }

    return () => {
      const cleanupEntry = textureCache.get(url);
      if (cleanupEntry) {
        cleanupEntry.refCount -= 1; // Decrement on unmount
        
        // Only dispose when no components are using this texture
        if (cleanupEntry.refCount <= 0 && !(cleanupEntry.resource instanceof Promise)) {
          cleanupEntry.resource.dispose();
          textureCache.delete(url);
        }
      }
    };
  }, [url]);

  return entry.resource as Texture;
};