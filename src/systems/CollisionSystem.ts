import { Entity } from "../entities/Entity";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class CollisionSystem extends System {
  async preload() { }

  update(_: number, entityManager: EntityManager) {
    const collisionEntities = entityManager.getEntitiesByComponents(["CollisionComponent", "TransformComponent"]);
    for (let i = 0; i < collisionEntities.length; i++) {
      const entityA = collisionEntities[i];
      for (let j = i + 1; j < collisionEntities.length; j++) {
        const entityB = collisionEntities[j];
        if (this.checkCollision(entityA, entityB)) {
          this.resolveCollision();
        }
      }
    }
  }

  render() { }


  checkCollision(entityA: Entity, entityB: Entity): boolean {
    // Calculate the min-max vertices for both colliders
    return false;
  }

  resolveCollision() {
    /* TODO: Implement resolution of collisions */
  }
}