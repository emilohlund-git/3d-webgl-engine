import { Game } from "./Game";
import { ShaderProgram } from "./ShaderProgram";
import { WebGLCanvas } from "./WebGLCanvas";
import { RenderComponent } from "./components/RenderComponent";
import { Entity } from "./entities/Entity";
import { EntityManager } from "./entities/EntityManager";
import { RenderSystem } from "./systems/RenderSystem";

const main = async () => {
  const window = new WebGLCanvas(600, 400);

  const entityManager = new EntityManager();

  const triangle = new Entity();

  const shaderProgram = new ShaderProgram(window.gl);
  await shaderProgram.initializeShaders("./shaders/vert-shader.vert", "./shaders/frag-shader.frag");

  const renderComponent = new RenderComponent(
    [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5],
    [0, 0, 0],
    shaderProgram
  );

  triangle.addComponent("RenderComponent", renderComponent);

  entityManager.addEntity(triangle);

  const game = new Game(entityManager);

  const renderSystem = new RenderSystem(window, entityManager);

  game.addSystem(renderSystem);
  game.run();
};

document.addEventListener("DOMContentLoaded", () => {
  main();
});