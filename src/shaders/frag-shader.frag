#version 300 es

precision mediump float;

// Input from vertex shader
in vec3 vColor;

// Output to the frame buffer
out vec4 outColor;

void main() {
  // Simply use the color computed in the vertex shader
  outColor = vec4(vColor, 1.0f);
}