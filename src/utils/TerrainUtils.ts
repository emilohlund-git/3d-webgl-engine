import { vec2, vec3 } from "gl-matrix";

export class TerrainUtils {
  static generateHeightMap(width: number, height: number, frequency: number, amplitude: number, octaves: number) {
    const heightMap = new Array(height).fill(0).map(() => new Array(width).fill(0));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let noiseValue = 0;
        let frequencyTemp = frequency;
        let amplitudeTemp = amplitude;

        for (let o = 0; o < octaves; o++) {
          const xCoord = x * frequencyTemp;
          const yCoord = y * frequencyTemp;
          const noise = this.perlin(xCoord, yCoord); // Implement your own Perlin noise function

          noiseValue += noise * amplitudeTemp;

          frequencyTemp *= 2;
          amplitudeTemp *= 0.5;
        }

        // Ensure the height value is between -1 and 1
        noiseValue = Math.max(0, noiseValue);

        heightMap[y][x] = noiseValue;
      }
    }

    return heightMap;
  }

  private static interpolate(a0: number, a1: number, w: number): number {
    if (0.0 > w) return a0;
    if (1.0 < w) return a1;
    return (a1 - a0) * ((w * (w * 6.0 - 15.0) + 10) * w * w * w) + a0;
  }

  private static randomGradient(ix: number, iy: number): vec2 {
    const w = 8 * 32;
    const s = w / 2;
    let a = ix, b = iy;
    a *= 3284157443; b ^= (a << s) | (a >>> (w - s));
    b *= 1911520717; a ^= (b << s) | (b >>> (w - s));
    a *= 2048419325;
    const random = (a * (Math.PI / ~(~0 >>> 1))); // in [0, 2*Pi]
    const v: vec2 = [Math.cos(random), Math.sin(random)];
    return v;
  }

  private static dotGridGradient(ix: number, iy: number, x: number, y: number): number {
    const gradient = this.randomGradient(ix, iy);
    const dx = x - ix;
    const dy = y - iy;
    return (dx * gradient[0] + dy * gradient[1]);
  }

  private static perlin(x: number, y: number): number {
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const y0 = Math.floor(y);
    const y1 = y0 + 1;

    const sx = x - x0;
    const sy = y - y0;

    let n0, n1, ix0, ix1, value;

    n0 = this.dotGridGradient(x0, y0, x, y);
    n1 = this.dotGridGradient(x1, y0, x, y);
    ix0 = this.interpolate(n0, n1, sx);

    n0 = this.dotGridGradient(x0, x1, x, y);
    n1 = this.dotGridGradient(x1, y1, x, y);
    ix1 = this.interpolate(n0, n1, sx);

    value = this.interpolate(ix0, ix1, sy);
    return value;
  }

  static computeVertexNormals(vertices: number[], indices: number[]): vec3[] {
    const faceNormals: vec3[] = [];
    const vertexNormals: vec3[] = new Array(vertices.length / 3).fill(vec3.create());

    // Calculate face normals for each triangle
    for (let i = 0; i < indices.length; i += 3) {
      const p1 = indices[i] * 3;
      const p2 = indices[i + 1] * 3;
      const p3 = indices[i + 2] * 3;

      const v1 = vec3.fromValues(vertices[p1], vertices[p1 + 1], vertices[p1 + 2]);
      const v2 = vec3.fromValues(vertices[p2], vertices[p2 + 1], vertices[p2 + 2]);
      const v3 = vec3.fromValues(vertices[p3], vertices[p3 + 1], vertices[p3 + 2]);

      const edge1 = vec3.create();
      const edge2 = vec3.create();
      vec3.subtract(edge1, v2, v1);
      vec3.subtract(edge2, v3, v1);

      const faceNormal = vec3.create();
      vec3.cross(faceNormal, edge1, edge2);
      vec3.normalize(faceNormal, faceNormal);

      faceNormals.push(faceNormal);
    }

    // Accumulate face normals to obtain vertex normals
    for (let i = 0; i < indices.length; i++) {
      const vertexIndex = indices[i];
      vec3.add(vertexNormals[vertexIndex], vertexNormals[vertexIndex], faceNormals[Math.floor(i / 3)]);
    }

    // Normalize the vertex normals
    vertexNormals.forEach((normal) => {
      vec3.normalize(normal, normal);
    });

    return vertexNormals;
  }
}