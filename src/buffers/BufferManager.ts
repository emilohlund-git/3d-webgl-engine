import { ShaderProgram } from "../ShaderProgram";
import { ColorBuffer } from "../buffers/ColorBuffer";
import { IBO } from "../buffers/IBO";
import { VBO } from "../buffers/VBO";
import { RenderComponent } from "../components/RenderComponent";
import { UV } from "./UV";

export class BufferManager {
  private gl: WebGL2RenderingContext;
  private vbos: Map<string, VBO>;
  private ibos: Map<string, IBO>;
  private uvs: Map<String, UV>;
  private colorBuffers: Map<string, ColorBuffer>;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.vbos = new Map();
    this.ibos = new Map();
    this.uvs = new Map();
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

  createUV(id: string, data: Float32Array) {
    const uv = new UV(this.gl);
    uv.createBuffer(id, data);
    this.uvs.set(id, uv);
  }

  createColorBuffer(id: string, data: Float32Array) {
    const colorBuffer = new ColorBuffer(this.gl);
    colorBuffer.createBuffer(id, data);
    this.colorBuffers.set(id, colorBuffer);
  }

  createBuffers(id: string, renderComponent: RenderComponent) {
    this.createVBO(id, new Float32Array(renderComponent.vertices));
    this.createIBO(id, new Uint16Array(renderComponent.indices));
    this.createUV(id, new Float32Array(renderComponent.uvs));
  }

  bindVBO(id: string) {
    const vbo = this.vbos.get(id);
    if (vbo) vbo.bindBuffer(id);
    else console.warn(`Failed to get VBO for entity with ID: ${id}`);
  }

  bindIBO(id: string) {
    const ibo = this.ibos.get(id);
    if (ibo) ibo.bindBuffer(id);
    else console.warn(`Failed to get IBO for entity with ID: ${id}`);
  }

  bindColorBuffer(id: string) {
    const colorBuffer = this.colorBuffers.get(id);
    if (colorBuffer) colorBuffer.bindBuffer(id);
    else console.warn(`Failed to get Color Buffer for entity with ID: ${id}`);
  }

  bindUV(id: string) {
    const uv = this.uvs.get(id);
    if (uv) uv.bindBuffer(id);
    else console.warn(`Failed to get UV for entity with ID: ${id}`);
  }

  bindBuffers(id: string) {
    this.bindVBO(id);
    this.bindIBO(id);
    this.bindUV(id);
  }

  unbindVBO(id: string) {
    const vbo = this.vbos.get(id);
    if (vbo) vbo.unbindBuffer(id);
    else console.warn(`Failed to get VBO for entity with ID: ${id}`);
  }

  unbindIBO(id: string) {
    const ibo = this.ibos.get(id);
    if (ibo) ibo.unbindBuffer(id);
    else console.warn(`Failed to get IBO for entity with ID: ${id}`);
  }

  unbindColorBuffer(id: string) {
    const colorBuffer = this.colorBuffers.get(id);
    if (colorBuffer) colorBuffer.unbindBuffer(id);
    else console.warn(`Failed to get Color Buffer for entity with ID: ${id}`);
  }

  unbindUV(id: string) {
    const uv = this.uvs.get(id);
    if (uv) uv.unbindBuffer(id);
    else console.warn(`Failed to get UV for entity with ID: ${id}`);
  }

  inbindBuffers(id: string) {
    this.unbindVBO(id);
    this.unbindIBO(id);
    this.unbindUV(id);
  }

  associateVBOWithAttribute(id: string, program: ShaderProgram, attribute: string, size: number, type: number, stride: number, offset: number) {
    const vbo = this.vbos.get(id);
    if (vbo) vbo.associateWithAttribute(id, program.program!, attribute, size, type, stride, offset);
    else console.warn(`Failed to get VBO for entity with ID: ${id}`);
  }

  associateIBOWithAttribute(id: string, program: ShaderProgram, attribute: string, size: number, type: number, stride: number, offset: number) {
    const ibo = this.ibos.get(id);
    if (ibo) ibo.associateWithAttribute(id, program.program!, attribute, size, type, stride, offset);
    else console.warn(`Failed to get IBO for entity with ID: ${id}`);
  }

  associateColorBufferWithAttribute(id: string, program: ShaderProgram, attribute: string, size: number, type: number, stride: number, offset: number) {
    const colorBuffer = this.colorBuffers.get(id);
    if (colorBuffer) colorBuffer.associateWithAttribute(id, program.program!, attribute, size, type, stride, offset);
    else console.warn(`Failed to get Color Buffer for entity with ID: ${id}`);
  }

  associateUVWithAttribute(id: string, program: ShaderProgram, attribute: string, size: number, type: number, stride: number, offset: number) {
    const uv = this.uvs.get(id);
    if (uv) uv.associateWithAttribute(id, program.program!, attribute, size, type, stride, offset);
    else console.warn(`Failed to get UV for entity with ID: ${id}`);
  }
}
