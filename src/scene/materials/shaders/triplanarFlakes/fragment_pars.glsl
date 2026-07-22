#include <common>
varying vec3 vObjPos;
varying vec3 vObjNormal;
uniform float uFlakeScale;
uniform float uFlakeIntensity;

//Calculate how much of each projection (X,Y,Z) should be visible in a determinated pixel
vec3 getTriplanarWeights(vec3 normal) {
    vec3 blend = abs(normal); // We get only the axis we dont' care abount direction (-1.0,1.0 is the same axis)

    blend = pow(blend, vec3(8.0)); 
    
    blend = max(blend, 0.00001); // Prevent division by 0
    blend /= (blend.x + blend.y + blend.z); //Normalize (1.0 normal)
    return blend;
}