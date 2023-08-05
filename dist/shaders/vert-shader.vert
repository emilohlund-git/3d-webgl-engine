#version 300 es

// Input attributes
in vec3 position; // Vertex position
in vec3 color;    // Vertex color

uniform mat4 pMatrix;
uniform mat4 vMatrix;
uniform mat4 mMatrix;

// Output variables
out vec3 vColor;

void main() {
  gl_Position = pMatrix * vMatrix * mMatrix * vec4(position, 1.f);
  vColor = color;
}