export abstract class GLBuffer {
  private gl: WebGL2RenderingContext;
  private buffers: Map<string, WebGLBuffer>;
  private contextBase: number;

  constructor(
    gl: WebGL2RenderingContext,
    buffers: Map<string, WebGLBuffer>,
    contextBase: number,
  ) {
    this.gl = gl;
    this.buffers = buffers;
    this.contextBase = contextBase;
  }

  createBuffer(name: string, data: Float32Array | Uint16Array) {
    const indexBuffer = this.gl.createBuffer();
    if (!indexBuffer) return;
    this.buffers.set(name, indexBuffer);
    this.bindBuffer(name);
    this.gl.bufferData(this.contextBase, data, this.gl.STATIC_DRAW);
    this.unbindBuffer(name);
  }

  associateWithAttribute(name: string, program: WebGLProgram, attribute: string, size: number, type: number, stride: number, offset: number) {
    if (!this.buffers.get(name)) return;


    this.bindBuffer(name);
    const attributeLocation = this.gl.getAttribLocation(program, attribute);
    this.gl.vertexAttribPointer(attributeLocation, size, type, false, stride, offset);
    this.gl.enableVertexAttribArray(attributeLocation);
    this.unbindBuffer(name);
  }

  bindBuffer(name: string) {
    const buffer = this.buffers.get(name);
    if (!buffer) return;
    this.gl.bindBuffer(this.contextBase, buffer);
  }

  unbindBuffer(name: string) {
    const buffer = this.buffers.get(name);
    if (!buffer) return;
    this.gl.bindBuffer(this.contextBase, null);
  }

  getBuffer(name: string): WebGLBuffer | undefined {
    return this.buffers.get(name);
  }
}