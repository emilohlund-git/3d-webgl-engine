import { vec3 } from "gl-matrix";
import { ShaderProgram } from "../ShaderProgram";
import { MaterialComponent } from "../components/MaterialComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { SpotLightComponent } from "../components/lights/SpotLightComponent";
import { TerrainUtils } from "../utils/TerrainUtils";
import { Entity } from "./Entity";

export async function createTerrainEntity(webGLContext: WebGL2RenderingContext) {
  const heightmap = TerrainUtils.generateHeightMap(300, 300, 0.05, 2.0, 0.6);

  const terrain = new Entity();

  const shaderProgram = new ShaderProgram(webGLContext);
  await shaderProgram.initializeShaders("./shaders/vert-shader.vert", "./shaders/frag-shader.frag");

  const terrainSizeX = heightmap[0].length;
  const terrainSizeZ = heightmap.length;
  const terrainScaleY = 4; // Adjust this to control the terrain height

  const vertices = [];
  const indices = [];

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

  const normals = TerrainUtils.computeVertexNormals(vertices, indices);

  const materialComponent = new MaterialComponent(
    vec3.fromValues(0.6, 0.4, 0.2),
    0.8,
    .5,
  )

  const renderComponent = new RenderComponent(
    vertices,
    indices,
    normals,
    shaderProgram
  );

  terrain.addComponent("RenderComponent", renderComponent);
  terrain.addComponent("MaterialComponent", materialComponent);
  terrain.addComponent("LightComponent", new SpotLightComponent(
    vec3.fromValues(1.0, 1.0, 1.0),
    1,
    vec3.fromValues(0.0, -10.0, 1.0),
    vec3.fromValues(0.0, 1.0, 0.0),
    1,
    10,
    10,
    123
  ));
  terrain.addComponent("TransformComponent", new TransformComponent(vec3.fromValues(0, -10, 0)));

  return terrain;
}