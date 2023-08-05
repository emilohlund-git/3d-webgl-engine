import { mat4 } from "gl-matrix";
import { Game } from "./Game";
import { WebGLCanvas } from "./WebGLCanvas";
import { BufferManager } from "./buffers/BufferManager";
import { EntityManager } from "./entities/EntityManager";
import { createCubeEntity } from "./entities/createCubeEntity";
import { createTerrainEntity } from "./entities/createTerrainEntity";
import { CameraSystem } from "./systems/CameraSystem";
import { LightingSystem } from "./systems/LightingSystem";
import { RenderSystem } from "./systems/RenderSystem";
import { TransformSystem } from "./systems/TransformSystem";
import { TerrainUtils } from "./utils/TerrainUtils";

const main = async () => {
  try {
    const window = new WebGLCanvas(800, 800);

    const entityManager = new EntityManager();

    const heightmap = TerrainUtils.generateHeightMap(100, 100, 0.02, 1.0, 42);

    const terrain = await createTerrainEntity(window.gl, heightmap);
    const cube = await createCubeEntity(window.gl);
    entityManager.addEntities([terrain, cube])

    const game = new Game(entityManager);

    const bufferManager = new BufferManager(window.gl)
    const renderSystem = new RenderSystem(window, bufferManager);
    const transformSystem = new TransformSystem();
    const cameraSystem = new CameraSystem(0.001, mat4.create(), window, 0.1);
    const lightingSystem = new LightingSystem();

    game.addSystems([cameraSystem, transformSystem, lightingSystem, renderSystem]);
    game.run();
  } catch (error) {
    console.error(`Error creating entities: ${error}`)
  }
};

main();