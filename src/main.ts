import { Game } from "./Game";
import { ShaderProgram } from "./ShaderProgram";
import { WebGLCanvas } from "./WebGLCanvas";
import { BufferManager } from "./buffers/BufferManager";
import { RenderComponent } from "./components/RenderComponent";
import { TransformComponent } from "./components/TransformComponent";
import { Entity } from "./entities/Entity";
import { EntityManager } from "./entities/EntityManager";
import { RenderSystem } from "./systems/RenderSystem";
import { TransformSystem } from "./systems/TransformSystem";

const main = async () => {
  const window = new WebGLCanvas(800, 800);

  const entityManager = new EntityManager();

  const cube = new Entity();

  const shaderProgram = new ShaderProgram(window.gl);
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

  const transformComponent = new TransformComponent();

  cube.addComponent("RenderComponent", renderComponent);
  cube.addComponent("TransformComponent", transformComponent);

  entityManager.addEntity(cube);

  const game = new Game(entityManager);

  const bufferManager = new BufferManager(window.gl)
  const renderSystem = new RenderSystem(window, entityManager, bufferManager);
  const transformSystem = new TransformSystem(window, entityManager, bufferManager);

  game.addSystem(renderSystem);
  game.addSystem(transformSystem);
  game.run();
};

document.addEventListener("DOMContentLoaded", () => {
  main();
});