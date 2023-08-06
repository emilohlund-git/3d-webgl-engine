import { mat4, quat, vec3 } from "gl-matrix";
import { Game } from "./Game";
import { WebGLCanvas } from "./WebGLCanvas";
import { BufferManager } from "./buffers/BufferManager";
import { FirstPersonCamera } from "./cameras/FirstPersonCamera";
import { EntityManager } from "./entities/EntityManager";
import { createCubeEntity } from "./entities/createCubeEntity";
import { createSkybox } from "./entities/createSkyBox";
import { createTerrainEntity } from "./entities/createTerrainEntity";
import { CameraSystem } from "./systems/CameraSystem";
import { CollisionSystem } from "./systems/CollisionSystem";
import { LightingSystem } from "./systems/LightingSystem";
import { RenderSystem } from "./systems/RenderSystem";
import { TransformSystem } from "./systems/TransformSystem";

const main = async () => {
  try {
    const window = new WebGLCanvas(1600, 900);

    const entityManager = new EntityManager();

    const terrain = await createTerrainEntity(window.gl);
    const cube = await createCubeEntity(window.gl);
    const skybox = await createSkybox(window.gl);
    entityManager.addEntities([skybox, terrain, cube])

    const game = new Game(entityManager);

    const projectionMatrix = mat4.create();

    const camera = new FirstPersonCamera(vec3.fromValues(0, 0, -5), quat.create(), 2);

    const bufferManager = new BufferManager(window.gl)
    const renderSystem = new RenderSystem(window, bufferManager, camera, projectionMatrix);
    const transformSystem = new TransformSystem();
    const cameraSystem = new CameraSystem(0.001, projectionMatrix, window, camera, 0.1);
    const lightingSystem = new LightingSystem();
    const collisionSystem = new CollisionSystem();

    game.addSystems([cameraSystem, transformSystem, lightingSystem, renderSystem, collisionSystem]);
    game.run();
  } catch (error) {
    console.error(`Error creating entities: ${error}`)
  }
};

main();