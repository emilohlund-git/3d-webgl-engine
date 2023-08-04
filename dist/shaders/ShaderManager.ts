import { ShaderProgram } from "../ShaderProgram";

export class ShaderManager {
  private gl: WebGL2RenderingContext;
  private shaders: Map<string, ShaderProgram>;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.shaders = new Map();
  }

  async create(id: string, vertexShaderSource: string, fragmentShaderSource: string) {
    const shaderProgram = new ShaderProgram(this.gl);
    await shaderProgram.initializeShaders(vertexShaderSource, fragmentShaderSource);
    this.shaders.set(id, shaderProgram);
  }

  get(id: string): ShaderProgram | undefined {
    return this.shaders.get(id);
  }
}
