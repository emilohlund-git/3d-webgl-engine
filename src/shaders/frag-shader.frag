#version 300 es
precision highp float;

in vec3 vColor;
in vec3 vNormal;
in vec3 vLightDirection;
in vec2 vUv;

// Output to the frame buffer
out vec4 outColor;

// Lighting properties
uniform vec3 lightColor;
uniform float lightIntensity;
uniform vec3 ambientLightColor; // Ambient light color
uniform float ambientLightIntensity; // Ambient light intensity
uniform sampler2D textureSampler;

void main() {
  // Normalize the surface normal
    vec3 normal = normalize(vNormal);

  // Calculate the dot product between the light direction and the surface normal
    float dotProduct = max(dot(normal, vLightDirection), 0.0f);

  // Compute the directional lighting contribution using the dot product
    vec3 directionalContribution = lightColor * lightIntensity * dotProduct;

  // Compute the ambient lighting contribution
    vec3 ambientContribution = ambientLightColor * ambientLightIntensity;

  // Combine the directional and ambient lighting contributions
    vec3 lightingContribution = directionalContribution + ambientContribution;

  // Apply the lighting to the vertex color
    vec3 finalColor = vColor * lightingContribution;

  // Sample the texture and apply it to the material
    vec4 textureColor = texture(textureSampler, vUv);

    outColor = vec4((finalColor * textureColor.rgb), 1.0f);
}
