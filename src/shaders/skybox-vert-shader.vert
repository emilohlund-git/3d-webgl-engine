#version 300 es

in vec3 position;

uniform mat4 view;
uniform mat4 projection;

out vec3 TexCoords;

void main() {
    TexCoords = position;
    // Transform the vertex position from world space to view space
    vec4 viewPosition = view * vec4(position, 1.0f);
    // Transform the view space position to clip space
    gl_Position = projection * viewPosition;
}