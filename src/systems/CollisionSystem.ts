import { CollisionComponent } from "../components/CollisionComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class CollisionSystem extends System {
  async preload() { }

  update(_: number, entityManager: EntityManager) {
    const terrainEntity = entityManager.getEntitiesByComponent("TerrainComponent")[0];
    const collisionEntities = entityManager.getEntitiesByComponent("CollisionComponent").filter((e) => !e.hasComponent("TerrainComponent"));
    for (const entityA of collisionEntities) {
      const collisionA = entityA.getComponent<CollisionComponent>("CollisionComponent");
      if (!collisionA) continue;
      const transformA = entityA.getComponent<TransformComponent>("TransformComponent");
      if (!transformA) continue;
      const rigidBodyA = entityA.getComponent<RigidBodyComponent>("RigidBodyComponent");
      if (!rigidBodyA) continue;

      const collisionB = terrainEntity.getComponent<CollisionComponent>("CollisionComponent");
      if (!collisionB) continue;
      const transformB = terrainEntity.getComponent<TransformComponent>("TransformComponent");
      if (!transformB) continue;
      const rigidBodyB = terrainEntity.getComponent<RigidBodyComponent>("RigidBodyComponent");
      if (!rigidBodyB) continue;

      if (transformA.position[1] < transformB.position[1] + (collisionA.size[1] + (collisionA.size[1] / 2))) {
        transformA.position[1] = collisionB.size[1] + collisionA.size[1] / 2;
        rigidBodyA.velocity[1] = 0;
      }
    }
  }

  render() { }
}
