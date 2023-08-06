import { Game } from "./Game";
import { WebGLCanvas } from "./WebGLCanvas";
import { BufferManager } from "./buffers/BufferManager";
import { config } from "./config";
import { EntityInitializer } from "./entities/EntitiyInitializer";
import { EntityManager } from "./entities/EntityManager";
import { SystemInitializer } from "./systems/SystemInitializer";

const main = async () => {
  try {
    const entityManager = new EntityManager();

    const window = new WebGLCanvas(config.canvasWidth, config.canvasHeight);

    await EntityInitializer.initializeEntities(entityManager, window.gl);

    const bufferManager = new BufferManager(window.gl);

    const systems = SystemInitializer.initializeSystems(window, bufferManager, config.cameraSpeed, config.mouseSensitivity);

    const game = new Game(entityManager);
    game.addSystems(systems);
    game.run();
  } catch (error) {
    console.error(`Error creating entities: ${error}`);
  }
};

main();