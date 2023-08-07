import { vec3 } from "gl-matrix";
import { TerrainUtils } from "./TerrainUtils";

export interface Mesh {
  vertices: number[];
  indices: number[];
  normals: vec3[];
  uvs?: number[];
}

export class MeshUtils {
  static generateGridMesh(rows: number, cols: number, heightmap: number[][] | undefined): Mesh {
    const terrainSizeX = heightmap ? heightmap[0].length : rows;
    const terrainSizeZ = heightmap ? heightmap.length : cols;
    const terrainScaleY = 4; // Adjust this to control the terrain height

    const vertices = [];
    const indices = [];

    // Create the flat grid vertices using heightmap data
    for (let z = 0; z < terrainSizeZ; z++) {
      for (let x = 0; x < terrainSizeX; x++) {
        const height = heightmap ? heightmap[z][x] * terrainScaleY : 1;
        vertices.push(x, height, z);
      }
    }

    // Create the indices for rendering the terrain
    for (let z = 0; z < terrainSizeZ - 1; z++) {
      for (let x = 0; x < terrainSizeX - 1; x++) {
        const topLeft = z * terrainSizeX + x;
        const topRight = topLeft + 1;
        const bottomLeft = (z + 1) * terrainSizeX + x;
        const bottomRight = bottomLeft + 1;

        // First triangle
        indices.push(topLeft, bottomLeft, topRight);

        // Second triangle
        indices.push(topRight, bottomLeft, bottomRight);
      }
    }

    const normals = TerrainUtils.computeVertexNormals(vertices, indices);

    return { vertices, indices, normals };
  }

  static generateCubeMesh(size: number): Mesh {
    const halfSize = size / 2;

    const vertices = [
      // Front face
      -halfSize, -halfSize, halfSize,
      halfSize, -halfSize, halfSize,
      halfSize, halfSize, halfSize,
      -halfSize, halfSize, halfSize,

      // Back face
      halfSize, -halfSize, -halfSize,
      -halfSize, -halfSize, -halfSize,
      -halfSize, halfSize, -halfSize,
      halfSize, halfSize, -halfSize,

      // Top face (counter-clockwise order)
      -halfSize, halfSize, -halfSize,
      halfSize, halfSize, -halfSize,
      halfSize, halfSize, halfSize,
      -halfSize, halfSize, halfSize,

      // Bottom face (counter-clockwise order)
      -halfSize, -halfSize, halfSize,
      halfSize, -halfSize, halfSize,
      halfSize, -halfSize, -halfSize,
      -halfSize, -halfSize, -halfSize,

      // Left face
      -halfSize, -halfSize, -halfSize,
      -halfSize, halfSize, -halfSize,
      -halfSize, halfSize, halfSize,
      -halfSize, -halfSize, halfSize,

      // Right face
      halfSize, -halfSize, halfSize,
      halfSize, halfSize, halfSize,
      halfSize, halfSize, -halfSize,
      halfSize, -halfSize, -halfSize,
    ];

    const indices = [
      0, 1, 2, 0, 2, 3, // Front face
      4, 5, 6, 4, 6, 7, // Back face
      8, 9, 10, 8, 10, 11, // Top face
      12, 13, 14, 12, 14, 15, // Bottom face
      16, 17, 18, 16, 18, 19, // Left face
      20, 21, 22, 20, 22, 23, // Right face
    ];

    const normals = TerrainUtils.computeVertexNormals(vertices, indices);

    const uvs = this.generateCubeUVs();

    return { vertices, indices, normals, uvs };
  }

  private static generateTerrainUVs(width: number, length: number): number[] {
    const uvs = [];

    for (let z = 0; z <= length; z++) {
      for (let x = 0; x <= width; x++) {
        const u = z / 2;
        const v = x / 2;
        uvs.push(u, v);
      }
    }

    return uvs;
  }

  private static generateCubeUVs(): number[] {
    return [
      // Front
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
      // Back
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
      // Top
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
      // Bottom
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
      // Right
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
      // Left
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    ];
  }
}