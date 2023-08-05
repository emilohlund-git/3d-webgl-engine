import { ShaderProgram } from "../ShaderProgram";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Entity } from "./Entity";

export async function createCubeEntity(webGLContext: WebGL2RenderingContext): Promise<Entity> {
  const cube = new Entity();

  const shaderProgram = new ShaderProgram(webGLContext);
  await shaderProgram.initializeShaders("./shaders/vert-shader.vert", "./shaders/frag-shader.frag");

  const renderComponent = new RenderComponent(
    [
      -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
      -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
      -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1,
      1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
      -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1,
      -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
    ],
    [
      0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7,
      8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15,
      16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23
    ],
    [
      5, 3, 7, 5, 3, 7, 5, 3, 7, 5, 3, 7,
      1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3,
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
      1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
      0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
    ],
    [0, 0, 0],
    shaderProgram
  );

  cube.addComponent("RenderComponent", renderComponent);
  cube.addComponent("TransformComponent", new TransformComponent());

  return cube;
}