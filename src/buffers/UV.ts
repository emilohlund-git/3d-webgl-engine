import { GLBuffer } from "./Buffer";

export class UV extends GLBuffer {
  constructor(gl: WebGL2RenderingContext) {
    super(gl, new Map<string, WebGLBuffer>(), gl.ARRAY_BUFFER);
  }
}