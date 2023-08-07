#version 300 es

// Input attributes
in vec3 position; // Vertex position
in vec3 normal;   // Vertex normal

out vec3 vColor;
out vec3 vNormal; // Output surface normal to fragment shader
out vec3 vLightDirection; // Output light direction in eye (view) space
out vec2 vUv;

// Uniforms
uniform mat4 pMatrix; // Projection matrix
uniform mat4 vMatrix; // View matrix
uniform mat4 mMatrix; // Model matrix
uniform vec3 materialColor; // Material color
uniform vec3 lightColor; // Light color
uniform float lightIntensity; // Light intensity
uniform vec3 lightDirection; // Directional light direction (in world space)

// Minimum intensity value
const float minIntensity = 0.1f; // Adjust this value as needed

// Ambient lighting color and intensity
const vec3 ambientColor = vec3(0.2f, 0.2f, 0.2f); // Adjust this color as needed
const float ambientIntensity = 0.2f; // Adjust this intensity as needed

void main() {
  // Combine the matrices to get the final transformation matrix
  mat4 mvMatrix = vMatrix * mMatrix;

  vec4 vPosition = pMatrix * mvMatrix * vec4(position, 1.0f);
  // Transform the vertex position based on the model-view matrix
  gl_Position = vPosition;

  // Compute the lighting contribution
  vec3 directionalLighting = max(lightColor * lightIntensity, vec3(minIntensity));
  vec3 ambientLighting = ambientColor * ambientIntensity;
  vec3 lightingContribution = directionalLighting + ambientLighting;

  // Apply the lighting to the vertex color
  vColor = materialColor * lightingContribution;

  // Transform the light direction from world space to eye space
  vec4 lightDirectionEye = vMatrix * vec4(lightDirection, 0.0f); // Directional light, so w-component is 0
  vLightDirection = normalize(lightDirectionEye.xyz);

  // Transform the normal to world space
  vNormal = normalize(mat3(mvMatrix) * normal);

  vUv = vec2(position.x, position.z);
}
