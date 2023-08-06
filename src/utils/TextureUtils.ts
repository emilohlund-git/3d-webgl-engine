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

  static async loadTextures(gl: WebGL2RenderingContext, imageSrcList: string[]): Promise<WebGLTexture[]> {
    return new Promise((resolve, reject) => {
      const textures = <WebGLTexture[]>[];
      for (const imageSrc of imageSrcList) {
        const texture = gl.createTexture();
        if (!texture) return reject();
        const image = new Image();
        image.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          gl.generateMipmap(gl.TEXTURE_2D);
          textures.push(texture);
        };
        image.onerror = reject;
        image.src = imageSrc;
      }
      if (textures.length === imageSrcList.length) {
        return resolve(textures);
      }
    });
  }

  static async loadCubeMapTexture(gl: WebGL2RenderingContext, imageSrcList: string[]): Promise<WebGLTexture> {
    return new Promise((resolve, reject) => {
      const texture = gl.createTexture();
      if (!texture) return reject("Failed to create WebGL texture.");

      gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      if (imageSrcList.length !== 6) {
        return reject("You must provide exactly 6 images for the cube map.");
      }

      const images: HTMLImageElement[] = [];

      let loadedImages = 0;

      for (let i = 0; i < imageSrcList.length; i++) {
        const image = new Image();
        image.onload = () => {
          images[i] = image;
          loadedImages++;

          if (loadedImages === 6) {
            // All images loaded, now upload them as cube map faces
            for (let face = 0; face < 6; face++) {
              gl.texImage2D(
                gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, // Cube map face
                0, // Level
                gl.RGBA, // Internal format
                gl.RGBA, // Format
                gl.UNSIGNED_BYTE, // Type
                images[face] // Image data
              );
            }

            resolve(texture);
          }
        };

        image.onerror = () => reject(`Failed to load image: ${imageSrcList[i]}`);
        image.src = imageSrcList[i];
      }
    });
  }
}