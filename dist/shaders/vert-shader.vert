attribute vec3 coordinates;

uniform mat4 uModelMatrix; // The uniform matrix for transformation
attribute vec3 color;
varying vec3 vColor;

void main() {
  gl_Position = uModelMatrix * vec4(coordinates, 1.0);
  vColor = color;
}