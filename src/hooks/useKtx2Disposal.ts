// useKtx2Disposal.ts
import { useEffect } from 'react';
import { Texture, WebGLRenderer } from 'three';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { useThree } from '@react-three/fiber';

let ktx2LoaderInstance: KTX2Loader | null = null;

interface CacheEntry {
  resource: Texture | Promise<Texture>;
  refCount: number;
}

const textureCache = new Map<string, CacheEntry>();

const getKTX2Loader = (gl: WebGLRenderer): KTX2Loader => {
  if (!ktx2LoaderInstance) {
    ktx2LoaderInstance = new KTX2Loader();
    ktx2LoaderInstance.setTranscoderPath('/basis/');
    ktx2LoaderInstance.detectSupport(gl);
  }
  return ktx2LoaderInstance;
};

// Pure function (NOT a hook): can be called in a loop without violating
// the Rules of Hooks, and without waiting for the previous one to resolve.
const loadTexture = (url: string, loader: KTX2Loader): CacheEntry => {
  const cached = textureCache.get(url);
  if (cached) return cached;

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

  const entry: CacheEntry = { resource: promise, refCount: 0 };
  textureCache.set(url, entry);
  return entry;
};

// INPUT: map { key: url } — OUTPUT: map { key: Texture }, ready to be destructured
export const useKtx2Disposal = <K extends string>(urls: Record<K, string>): Record<K, Texture> => {
  const gl = useThree((state) => state.gl);
  const loader = getKTX2Loader(gl);
  const keys = Object.keys(urls) as K[];

  // Launch all loads in parallel (the dedup cache prevents duplicate requests).
  const entries = keys.map((key) => loadTexture(urls[key], loader));

  // Pausing just once—for all pending orders combined.
  const pending = entries
    .map((e) => e.resource)
    .filter((r): r is Promise<Texture> => r instanceof Promise);

  if (pending.length > 0) {
    throw Promise.all(pending);
  }

  // Stable key for the effect, independent of the identity of the `urls` object.
  const depKey = keys.map((key) => urls[key]).join('|');

  useEffect(() => {
    keys.forEach((key) => {
      const entry = textureCache.get(urls[key]);
      if (entry) entry.refCount += 1;
    });

    return () => {
      keys.forEach((key) => {
        const url = urls[key];
        const entry = textureCache.get(url);
        if (entry) {
          entry.refCount -= 1;
          if (entry.refCount <= 0 && !(entry.resource instanceof Promise)) {
            entry.resource.dispose();
            textureCache.delete(url);
          }
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depKey]);

  const result = {} as Record<K, Texture>;
  keys.forEach((key) => {
    result[key] = textureCache.get(urls[key])!.resource as Texture;
  });
  return result;
};

// reload outside of Suspense
useKtx2Disposal.preload = (urls: Record<string, string>, gl: WebGLRenderer): void => {
  const loader = getKTX2Loader(gl);
  Object.values(urls).forEach((url) => loadTexture(url as string, loader));
};