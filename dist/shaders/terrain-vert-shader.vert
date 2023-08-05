#version 300 es

// Input attributes
in vec3 position; // Vertex position
in vec3 color;    // Vertex color

// Output variables
out vec3 vColor;

// Uniforms
uniform mat4 pMatrix; // Projection matrix
uniform mat4 vMatrix; // View matrix
uniform mat4 mMatrix; // Model matrix

void main() {
  // Combine the matrices to get the final transformation matrix
  mat4 mvMatrix = vMatrix * mMatrix;

  // Transform the vertex position based on the model-view matrix
  gl_Position = pMatrix * mvMatrix * vec4(position, 1.0f);

  // Pass the color to the fragment shader
  vColor = color;
}
