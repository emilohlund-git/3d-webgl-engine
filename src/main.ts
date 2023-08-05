import { mat4 } from "gl-matrix";
import { Game } from "./Game";
import { InputManager } from "./InputManager";
import { ShaderProgram } from "./ShaderProgram";
import { WebGLCanvas } from "./WebGLCanvas";
import { BufferManager } from "./buffers/BufferManager";
import { CameraComponent } from "./components/CameraComponent";
import { RenderComponent } from "./components/RenderComponent";
import { TransformComponent } from "./components/TransformComponent";
import { Entity } from "./entities/Entity";
import { EntityManager } from "./entities/EntityManager";
import { CameraSystem } from "./systems/CameraSystem";
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

  cube.addComponent("RenderComponent", renderComponent);
  cube.addComponent("TransformComponent", new TransformComponent());

  const camera = new Entity();
  camera.addComponent("CameraComponent", new CameraComponent());
  camera.addComponent("TransformComponent", new TransformComponent())

  entityManager.addEntities([cube, camera])

  const game = new Game(entityManager);

  const bufferManager = new BufferManager(window.gl)
  const inputManager = new InputManager();
  const renderSystem = new RenderSystem(window, entityManager, bufferManager);
  const transformSystem = new TransformSystem(window, entityManager, bufferManager, mat4.create());
  const cameraSystem = new CameraSystem(entityManager, inputManager, 0.001, 0.1);

  game.addSystem(renderSystem);
  game.addSystem(transformSystem);
  game.addSystem(cameraSystem);
  game.run();
};

document.addEventListener("DOMContentLoaded", () => {
  main();
});