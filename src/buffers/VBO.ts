import { GLBuffer } from "./Buffer";

/**
 * Represents a Vertex Buffer Object (VBO) manager for WebGL.
 */
export class VBO extends GLBuffer {
  constructor(gl: WebGL2RenderingContext) {
    super(gl, new Map<string, WebGLBuffer>(), gl.ARRAY_BUFFER);
  }
}