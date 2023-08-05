import { vec3 } from "gl-matrix";
import { ShaderProgram } from "../ShaderProgram";
import { LightingComponent } from "../components/LightingComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Entity } from "./Entity";

export async function createCubeEntity(webGLContext: WebGL2RenderingContext): Promise<Entity> {
  const cube = new Entity();

  const shaderProgram = new ShaderProgram(webGLContext);
  await shaderProgram.initializeShaders("./shaders/vert-shader.vert", "./shaders/frag-shader.frag");

  const vertices = [
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
    -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1,
    1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
    -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1,
    -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
  ];

  const indices = [
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23
  ];

  const colors = [
    5, 3, 7, 5, 3, 7, 5, 3, 7, 5, 3, 7,
    1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3,
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
  ];

  const renderComponent = new RenderComponent(
    vertices,
    indices,
    colors,
    [],
    shaderProgram
  );

  const lightingComponent = new LightingComponent(
    vec3.fromValues(1.0, 1.0, 1.0),
    .2
  )

  cube.addComponent("RenderComponent", renderComponent);
  cube.addComponent("LightingComponent", lightingComponent);
  cube.addComponent("TransformComponent", new TransformComponent(vec3.fromValues(0, 0.035, 0)));

  return cube;
}