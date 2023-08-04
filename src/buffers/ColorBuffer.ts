import { GLBuffer } from "./Buffer";

export class ColorBuffer extends GLBuffer {
  constructor(gl: WebGL2RenderingContext) {
    super(gl, new Map<string, WebGLBuffer>(), gl.ARRAY_BUFFER);
  }
}