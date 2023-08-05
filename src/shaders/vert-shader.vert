#version 300 es

// Input attributes
in vec3 position; // Vertex position
in vec3 color;    // Vertex color

uniform mat4 pMatrix;
uniform mat4 vMatrix;
uniform mat4 mMatrix;
uniform vec3 lightColor; // Light color
uniform float lightIntensity; // Light intensity

// Output variables
out vec3 vColor;

void main() {
  // Combine the matrices to get the final transformation matrix
  mat4 mvMatrix = vMatrix * mMatrix;

  // Transform the vertex position based on the model-view matrix
  gl_Position = pMatrix * mvMatrix * vec4(position, 1.0f);

  // Compute the lighting contribution
  vec3 lightingContribution = lightColor * lightIntensity;

  // Apply the lighting to the vertex color
  vColor = color * lightingContribution;
}
