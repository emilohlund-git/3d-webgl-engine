import { ShaderProgram } from "../ShaderProgram";
import { ColorBuffer } from "../buffers/ColorBuffer";
import { IBO } from "../buffers/IBO";
import { VBO } from "../buffers/VBO";

export class BufferManager {
  private gl: WebGL2RenderingContext;
  private vbos: Map<string, VBO>;
  private ibos: Map<string, IBO>;
  private colorBuffers: Map<string, ColorBuffer>;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.vbos = new Map();
    this.ibos = new Map();
    this.colorBuffers = new Map();
  }

  createVBO(id: string, data: Float32Array) {
    const vbo = new VBO(this.gl);
    vbo.createBuffer(id, data);
    this.vbos.set(id, vbo);
  }

  createIBO(id: string, data: Uint16Array) {
    const ibo = new IBO(this.gl);
    ibo.createBuffer(id, data);
    this.ibos.set(id, ibo);
  }

  createColorBuffer(id: string, data: Float32Array) {
    const colorBuffer = new ColorBuffer(this.gl);
    colorBuffer.createBuffer(id, data);
    this.colorBuffers.set(id, colorBuffer);
  }

  bindVBO(id: string) {
    const vbo = this.vbos.get(id);
    if (vbo) vbo.bindBuffer(id);
  }

  bindIBO(id: string) {
    const ibo = this.ibos.get(id);
    if (ibo) ibo.bindBuffer(id);
  }

  associateVBOWithAttribute(id: string, program: ShaderProgram, attribute: string, size: number, type: number, stride: number, offset: number) {
    const vbo = this.vbos.get(id);
    if (vbo) vbo.associateWithAttribute(id, program.program!, attribute, size, type, stride, offset);
  }

  associateIBOWithAttribute(id: string, program: ShaderProgram, attribute: string, size: number, type: number, stride: number, offset: number) {
    const ibo = this.ibos.get(id);
    if (ibo) ibo.associateWithAttribute(id, program.program!, attribute, size, type, stride, offset);
  }

  associateColorBufferWithAttribute(id: string, program: ShaderProgram, attribute: string, size: number, type: number, stride: number, offset: number) {
    const colorBuffer = this.colorBuffers.get(id);
    if (colorBuffer) colorBuffer.associateWithAttribute(id, program.program!, attribute, size, type, stride, offset);
  }
}
