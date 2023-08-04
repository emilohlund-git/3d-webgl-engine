attribute vec3 coordinates;

uniform mat4 pMatrix;
uniform mat4 vMatrix;
uniform mat4 mMatrix;
attribute vec3 color;
varying vec3 vColor;

void main() {
 gl_Position = pMatrix*vMatrix*mMatrix*vec4(coordinates, 1.);
  vColor = color;
}