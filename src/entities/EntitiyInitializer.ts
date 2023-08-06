import { EntityManager } from "./EntityManager";
import { createCubeEntity } from "./createCubeEntity";
import { createSkybox } from "./createSkyBox";
import { createTerrainEntity } from "./createTerrainEntity";

export class EntityInitializer {
  static async initializeEntities(entityManager: EntityManager, gl: WebGL2RenderingContext) {
    const terrain = await createTerrainEntity(gl);
    const cube = await createCubeEntity(gl);
    const skybox = await createSkybox(gl);

    entityManager.addEntities([skybox, terrain, cube]);
  }
}