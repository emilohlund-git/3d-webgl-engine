import { vec3 } from "gl-matrix";
import { ShaderProgram } from "../ShaderProgram";
import { LightComponent } from "../components/LightComponent";
import { MaterialComponent } from "../components/MaterialComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { TerrainUtils } from "../utils/TerrainUtils";
import { Entity } from "./Entity";

export async function createLightEntity(webGLContext: WebGL2RenderingContext): Promise<Entity> {
  const light = new Entity();

  const shaderProgram = new ShaderProgram(webGLContext);
  await shaderProgram.initializeShaders("./shaders/vert-shader.vert", "./shaders/frag-shader.frag");

  const vertices = [
    -1, -1, -1
  ];

  const indices = [
    0
  ];

  const normals = TerrainUtils.computeVertexNormals(vertices, indices);

  const materialComponent = new MaterialComponent(
    vec3.fromValues(0.0, 1.0, 0.0),
    0.8,
    .5,
  )

  const renderComponent = new RenderComponent(
    vertices,
    indices,
    normals,
    shaderProgram
  );

  light.addComponent("RenderComponent", renderComponent);
  light.addComponent("LightComponent", new LightComponent(
    vec3.fromValues(1.0, 1.0, 1.0),
    11,
    vec3.fromValues(0.0, -1.0, 1.0),
  ));
  light.addComponent("TransformComponent", new TransformComponent(vec3.fromValues(4, 0.035, 4)));

  return light;
}