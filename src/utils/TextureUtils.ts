export class TextureUtils {
  static async loadTexture(gl: WebGL2RenderingContext, imageSrc: string): Promise<WebGLTexture> {
    return new Promise((resolve, reject) => {
      const texture = gl.createTexture();
      if (!texture) return reject();
      const image = new Image();
      image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        return resolve(texture);
      };
      image.onerror = reject;
      image.src = imageSrc;
    });
  }
}