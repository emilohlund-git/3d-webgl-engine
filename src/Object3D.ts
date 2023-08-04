import { VBO } from "./VBO";

export class Object3D {
  private vbo: VBO;
  private vertexData: number[];
  private id: string;

  constructor(vbo: VBO, vertexData: number[], id: string) {
    this.vbo = vbo;
    this.vertexData = vertexData;
    this.id = id;
  }

  initialize() {
    this.vbo.createVertexBuffer(this.id, this.vertexData);
  }

  associateWithAttribute(program: WebGLProgram, attribute: string, size: number, type: number, stride: number, offset: number) {
    this.vbo.associateWithAttribute(this.id, program, attribute, size, type, stride, offset);
  }
}
