/**
 * Represents a Vertex Buffer Object (VBO) manager for WebGL.
 */
export class VBO {
  private gl: WebGL2RenderingContext;
  private buffers: Map<string, WebGLBuffer>;

  /**
   * Creates a new VBO instance.
   * @param {WebGL2RenderingContext} gl - The WebGL context.
   */
  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.buffers = new Map();
  }

  /**
   * Creates a new vertex buffer and associates it with the specified name.
   * @param {string} name - The unique name to associate with the buffer.
   * @param {number[]} vertices - The vertex data array.
   */
  createVertexBuffer(name: string, vertices: number[]) {
    const vertexBuffer = this.gl.createBuffer();
    if (!vertexBuffer) return;
    this.buffers.set(name, vertexBuffer);
    this.bindBuffer(name);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
    this.unbindBuffer(name);
  }

  /**
   * Associates the specified buffer with the provided shader program attribute.
   * @param {WebGLProgram} program - The WebGL program to associate the buffer with.
   * @param {string} attribute - The name of the attribute in the shader program.
   * @param {number} size - The number of components per vertex attribute (e.g., 2 for (x, y)).
   * @param {number} type - The data type of the attribute.
   * @param {number} stride - The offset in bytes between consecutive vertex attributes.
   * @param {number} offset - The offset in bytes of the first component in the vertex attribute.
   */
  associateWithAttribute(name: string, program: WebGLProgram, attribute: string, size: number, type: number, stride: number, offset: number) {
    if (!this.buffers.get(name)) return;

    this.bindBuffer(name); // Bind the buffer before setting up the attribute

    const attributeLocation = this.gl.getAttribLocation(program, attribute);
    this.gl.vertexAttribPointer(attributeLocation, size, type, false, stride, offset);
    this.gl.enableVertexAttribArray(attributeLocation);

    this.unbindBuffer(name); // Unbind the buffer after setup
  }

  /**
   * Binds the specified buffer to the WebGL context.
   * @param {string} name - The name of the buffer to bind.
   */
  bindBuffer(name: string) {
    const buffer = this.buffers.get(name);
    if (!buffer) return;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  }

  /**
   * Unbinds the specified buffer from the WebGL context.
   * @param {string} name - The name of the buffer to unbind.
   */
  unbindBuffer(name: string) {
    const buffer = this.buffers.get(name);
    if (!buffer) return;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  /**
  * Gets the buffer associated with the specified name.
  * @param {string} name - The name of the buffer to retrieve.
  * @returns {WebGLBuffer | undefined} The buffer associated with the specified name, if it exists.
  */
  getBuffer(name: string): WebGLBuffer | undefined {
    return this.buffers.get(name);
  }
}