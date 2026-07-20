#ifdef USE_NORMALMAP
    vec3 blendWeights = getTriplanarWeights(vObjNormal);

    // Procedural sampling on X, Y, Z scaled ignore UV of the vehicle
    vec3 nX = texture2D(normalMap, vObjPos.yz * uFlakeScale).rgb * 2.0 - 1.0; //Normalize from [0,1] --> [-1,1]
    vec3 nY = texture2D(normalMap, vObjPos.xz * uFlakeScale).rgb * 2.0 - 1.0;
    vec3 nZ = texture2D(normalMap, vObjPos.xy * uFlakeScale).rgb * 2.0 - 1.0;

    //Multiply for weight
    vec3 triplanarTangentN = nX * blendWeights.x + nY * blendWeights.y + nZ * blendWeights.z;
    triplanarTangentN.xy *= normalScale;
    triplanarTangentN = normalize(triplanarTangentN);

    // Construct a view-dependent TBN matrix for the sparkling effect.
    // We cannot use bitanget and tanget extracted form the UV so we build owr own
    vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
    if(length(tangent) < 0.01) tangent = normalize(cross(normal, vec3(1.0, 0.0, 0.0)));
    vec3 bitangent = cross(normal, tangent);

    mat3 pseudoTBN = mat3(tangent, bitangent, normal);
    normal = normalize(pseudoTBN * triplanarTangentN);
#endif