import { ShaderProgram } from "../ShaderProgram";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Entity } from "./Entity";

export async function createTerrainEntity(webGLContext: WebGL2RenderingContext, heightmap: number[][]) {
  const terrain = new Entity();

  const shaderProgram = new ShaderProgram(webGLContext);
  await shaderProgram.initializeShaders("./shaders/terrain-vert-shader.vert", "./shaders/terrain-frag-shader.frag");

  const terrainSizeX = heightmap[0].length;
  const terrainSizeZ = heightmap.length;
  const terrainScaleY = 0.1; // Adjust this to control the terrain height

  const vertices = [];
  const indices = [];
  const colors = <number[]>[];

  // Create the flat grid vertices using heightmap data
  for (let z = 0; z < terrainSizeZ; z++) {
    for (let x = 0; x < terrainSizeX; x++) {
      const height = heightmap[z][x] * terrainScaleY;
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

  const renderComponent = new RenderComponent(
    vertices,
    indices,
    colors, // Color array, can be left empty for now
    shaderProgram
  );

  terrain.addComponent("RenderComponent", renderComponent);
  terrain.addComponent("TransformComponent", new TransformComponent());

  return terrain;
}