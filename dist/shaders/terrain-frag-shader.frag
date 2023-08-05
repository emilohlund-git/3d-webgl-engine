#version 300 es
precision highp float;

// Input variables
in vec3 vColor; // Vertex color

// Output
out vec4 fragColor;

void main() {
  // Use the vertex color as the fragment color
  fragColor = vec4(vColor, 1.0f);
}
