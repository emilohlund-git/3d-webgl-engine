import { mat4 } from "gl-matrix";
import { Game } from "./Game";
import { WebGLCanvas } from "./WebGLCanvas";
import { BufferManager } from "./buffers/BufferManager";
import { EntityManager } from "./entities/EntityManager";
import { createCubeEntity } from "./entities/createCubeEntity";
import { CameraSystem } from "./systems/CameraSystem";
import { RenderSystem } from "./systems/RenderSystem";
import { TransformSystem } from "./systems/TransformSystem";

const main = async () => {
  try {
    const window = new WebGLCanvas(800, 800);

    const entityManager = new EntityManager();

    const cube = await createCubeEntity(window.gl);
    entityManager.addEntities([cube])

    const game = new Game(entityManager);

    const bufferManager = new BufferManager(window.gl)
    const renderSystem = new RenderSystem(window, entityManager, bufferManager);
    const transformSystem = new TransformSystem(window, entityManager, bufferManager, mat4.create());
    const cameraSystem = new CameraSystem(0.001, 0.1);

    game.addSystems([renderSystem, transformSystem, cameraSystem]);
    game.run();
  } catch (error) {
    console.error(`Error creating entities: ${error}`)
  }
};

main();