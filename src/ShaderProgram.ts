import { mat4 } from "gl-matrix";

export class ShaderProgram {
  private gl: WebGL2RenderingContext;
  public vertexShader: WebGLShader | undefined;
  public fragmentShader: WebGLShader | undefined;
  private shaderProgram: WebGLProgram | undefined;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.vertexShader = undefined;
    this.fragmentShader = undefined;
    this.shaderProgram = undefined;
  }

  async loadShaderSource(url: string): Promise<string> {
    const response = await fetch(url);
    return response.text();
  }

  async initializeShaders(vertexShaderUrl: string, fragmentShaderUrl: string): Promise<void> {
    const vertexShaderSource = await this.loadShaderSource(vertexShaderUrl);
    const fragmentShaderSource = await this.loadShaderSource(fragmentShaderUrl);

    this.vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vertexShaderSource);
    this.fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (this.vertexShader && this.fragmentShader) {
      this.create();
    }
  }

  compileShader(type: number, source: string): WebGLShader | undefined {
    const shader = this.gl.createShader(type);
    if (!shader) return undefined;

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return undefined;
    }

    return shader;
  }

  create() {
    const shaderProgram = this.gl.createProgram();
    if (!shaderProgram || !this.vertexShader || !this.fragmentShader) return;

    this.gl.attachShader(shaderProgram, this.vertexShader);
    this.gl.attachShader(shaderProgram, this.fragmentShader);

    this.gl.linkProgram(shaderProgram);
    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      console.error("Shader program linking error:", this.gl.getProgramInfoLog(shaderProgram));
      return;
    }

    this.gl.useProgram(shaderProgram);

    // Clean up individual shaders as they are already linked into the program
    this.gl.deleteShader(this.vertexShader);
    this.gl.deleteShader(this.fragmentShader);

    this.shaderProgram = shaderProgram;
  }

  use() {
    if (!this.program) return;
    this.gl.useProgram(this.program);
  }

  get program(): WebGLProgram | undefined {
    return this.shaderProgram;
  }

  setUniformMatrix4fv(uniformName: string, matrix: mat4) {
    if (!this.program) return;

    this.use();

    const location = this.gl.getUniformLocation(this.program, uniformName);
    if (!location) return;

    this.gl.uniformMatrix4fv(location, false, matrix);
  }
}

