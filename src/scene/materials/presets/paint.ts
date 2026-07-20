import * as THREE from 'three';
import { FlakesTexture } from 'three-stdlib';

//Shaders
import vertexPars from '../shaders/triplanarFlakes/vertex_pars.glsl';
import vertexMain from '../shaders/triplanarFlakes/vertex_main.glsl';
import fragmentPars from '../shaders/triplanarFlakes/fragment_pars.glsl';
import fragmentMain from '../shaders/triplanarFlakes/fragment_main.glsl';

//VORONOI FLAKES TEXTURE
let proceduralFlakes: THREE.CanvasTexture | null = null;

function getFlakesTexture(): THREE.CanvasTexture {
  if (!proceduralFlakes) {
    const canvas = new FlakesTexture(512, 512) as unknown as HTMLCanvasElement;
    
    proceduralFlakes = new THREE.CanvasTexture(canvas);
    proceduralFlakes.wrapS = THREE.RepeatWrapping;
    proceduralFlakes.wrapT = THREE.RepeatWrapping;
    proceduralFlakes.minFilter = THREE.LinearMipMapLinearFilter;
    proceduralFlakes.magFilter = THREE.LinearFilter;
  }
  return proceduralFlakes;
}
// PASTEL PAINT
export const applySolidPaint = (material: THREE.MeshPhysicalMaterial, hexColor: string): void => {
  material.color.set(hexColor);
  material.normalMap = null;
  material.roughnessMap = null;
  
  material.roughness = 0.1;
  material.metalness = 0.0; 

  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.01; 

  material.ior = 1.5;
  
  material.envMapIntensity = 1.0; 
  
  material.sheen = 0.0;
  material.iridescence = 0.0;

  //Remove custom injection if present
  material.onBeforeCompile = () => {};
  material.customProgramCacheKey = () => 'solid_paint';

  material.needsUpdate = true;
};

// METALLIC PAINT
export const applyMetallicPaint = (
  material: THREE.MeshPhysicalMaterial, 
  hexColor: string
): void => {
  material.color.set(hexColor);

  material.normalMap = getFlakesTexture();
  material.normalScale.set(0.5, 0.5); 
  
  material.roughnessMap = null;
  material.roughness = 0.3;
  material.metalness = 0.8; 

  material.clearcoat = 1.0;
  material.clearcoatNormalMap = null; 
  material.clearcoatRoughness = 0.0;
  material.ior = 1.52; 

  material.sheen = 0.0;
  material.iridescence = 0.0;
  
  // INJECT SHADER
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uFlakeScale = { value: 200.0 };

    shader.vertexShader = shader.vertexShader.replace('#include <common>', vertexPars);
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', vertexMain);
    
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', fragmentPars);
    shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_maps>', fragmentMain);
  };

  material.needsUpdate = true;
  material.customProgramCacheKey = () => 'triplanar_metallic_flakes';
};

export const applySpecialPaint = (
  material: THREE.MeshPhysicalMaterial, 
  paintConfig: { name: string; hex: string }
): void => {

  // PYTHON GREEN CHROMAFLAIR (Thin Film Iridescence)
  if (paintConfig.name === 'Python Green Chromaflair') {
    applyMetallicPaint(material, paintConfig.hex); 
    
    // Iridescence
    material.iridescence = 1.0; 
    material.iridescenceIOR = 2.0;
    
    // The thickness of the film in nanometers determines the color gradient
    // 400 nm → 600 nm creates exactly the Green → Gold → Copper color shift.
    material.iridescenceThicknessRange = [400, 580]; //Without thickness map the first number is ignored

    material.needsUpdate = true;
    return;
  }
  
  // Fallback
  applySolidPaint(material, paintConfig.hex);
};