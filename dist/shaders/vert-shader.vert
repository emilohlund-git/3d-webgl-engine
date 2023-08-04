attribute vec2 coordinates;

uniform mat4 uModelMatrix; // The uniform matrix for transformation

void main() {
  gl_Position = uModelMatrix * vec4(coordinates, 0.0, 1.0);
}