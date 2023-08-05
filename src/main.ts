import { mat4 } from "gl-matrix";
import { Game } from "./Game";
import { WebGLCanvas } from "./WebGLCanvas";
import { BufferManager } from "./buffers/BufferManager";
import { EntityManager } from "./entities/EntityManager";
import { createCubeEntity } from "./entities/createCubeEntity";
import { createTerrainEntity } from "./entities/createTerrainEntity";
import { CameraSystem } from "./systems/CameraSystem";
import { RenderSystem } from "./systems/RenderSystem";
import { TransformSystem } from "./systems/TransformSystem";

const main = async () => {
  try {
    const window = new WebGLCanvas(800, 800);

    const entityManager = new EntityManager();

    const heightmap = [
      [0.1, 0.2, 0.3, 0.2],
      [0.2, 0.3, 0.5, 0.4],
      [0.3, 0.5, 0.7, 0.6],
      [0.2, 0.4, 0.6, 0.4]
    ];

    const terrain = await createTerrainEntity(window.gl, heightmap);
    const cube = await createCubeEntity(window.gl);
    entityManager.addEntities([terrain, cube])

    const game = new Game(entityManager);

    const bufferManager = new BufferManager(window.gl)
    const renderSystem = new RenderSystem(window, entityManager, bufferManager);
    const transformSystem = new TransformSystem(window, bufferManager);
    const cameraSystem = new CameraSystem(0.001, mat4.create(), window, 0.1);

    game.addSystems([cameraSystem, transformSystem, renderSystem]);
    game.run();
  } catch (error) {
    console.error(`Error creating entities: ${error}`)
  }
};

main();