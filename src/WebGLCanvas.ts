export class WebGLCanvas {
  public width: number;
  public height: number;
  public gl: WebGL2RenderingContext;

  constructor(width: number, height: number) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const gl = canvas.getContext("webgl2");
    if (!gl) throw new Error("Failed to initialize GL context.");
    this.gl = gl;

    this.width = width;
    this.height = height;
    document.body.appendChild(canvas);


  }

  clear() {
    this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  setViewPort() {
    this.gl.viewport(0, 0, this.width, this.height);
  }


}