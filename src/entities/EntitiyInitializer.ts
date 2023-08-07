import { vec3 } from "gl-matrix";
import { EntityManager } from "./EntityManager";
import { createCubeEntity } from "./createCubeEntity";
import { createSkybox } from "./createSkyBox";
import { createTerrainEntity } from "./createTerrainEntity";

export class EntityInitializer {
  static async initializeEntities(entityManager: EntityManager, gl: WebGL2RenderingContext) {
    const terrain = await createTerrainEntity(gl);

    for (let i = 0; i < 10; i++) {
      const cube = await createCubeEntity(gl, vec3.fromValues(i * 2, i * 20, 0));
      entityManager.addEntity(cube);
    }

    const skybox = await createSkybox(gl);

    entityManager.addEntities([skybox, terrain]);
  }
}