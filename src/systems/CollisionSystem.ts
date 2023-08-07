import { vec3 } from "gl-matrix";
import { CollisionComponent } from "../components/CollisionComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Entity } from "../entities/Entity";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class CollisionSystem extends System {
  async preload() { }

  update(_: number, entityManager: EntityManager) {
    const collisionEntities = entityManager.getEntitiesByComponent("RigidBodyComponent");
    for (let i = 0; i < collisionEntities.length; i++) {
      const entityA = collisionEntities[i];
      for (let j = i + 1; j < collisionEntities.length; j++) {
        const entityB = collisionEntities[j];
        if (this.checkCollision(entityA, entityB)) {
          console.log("COLLIDING HERE");
          this.resolveCollision(entityA, entityB);
        }
      }
    }
  }

  render() { }

  checkCollision(entityA: Entity, entityB: Entity): boolean {
    const transformA = entityA.getComponent<TransformComponent>("TransformComponent");
    const transformB = entityB.getComponent<TransformComponent>("TransformComponent");
    const collisionA = entityA.getComponent<CollisionComponent>("CollisionComponent");
    const collisionB = entityB.getComponent<CollisionComponent>("CollisionComponent");

    if (!transformA || !transformB || !collisionA || !collisionB) return false;

    // Calculate the AABBs for both entities
    const aabbA = this.calculateAABB(transformA, collisionA);
    const aabbB = this.calculateAABB(transformB, collisionB);

    // Check for collision along each axis (X, Y, and Z)
    if (aabbA.maxX < aabbB.minX || aabbA.minX > aabbB.maxX) return false; // No collision along X-axis
    if (aabbA.maxY < aabbB.minY || aabbA.minY > aabbB.maxY) return false; // No collision along Y-axis
    if (aabbA.maxZ < aabbB.minZ || aabbA.minZ > aabbB.maxZ) return false; // No collision along Z-axis

    // If there is a collision along all axes, then collision is detected
    return true;
  }

  resolveCollision(entityA: Entity, entityB: Entity) {
    // Get the TransformComponent and CollisionComponent for both entities
    const transformA = entityA.getComponent<TransformComponent>("TransformComponent");
    const collisionA = entityA.getComponent<CollisionComponent>("CollisionComponent");
    const transformB = entityB.getComponent<TransformComponent>("TransformComponent");
    const collisionB = entityB.getComponent<CollisionComponent>("CollisionComponent");
    const rigidBodyComponentA = entityB.getComponent<RigidBodyComponent>("RigidBodyComponent");

    if (!transformA || !collisionA || !transformB || !collisionB || !rigidBodyComponentA) return;

    console.log("COLLIDING");
    // If the entity is colliding with the terrain and moving downward (velocity.y < 0)
    rigidBodyComponentA.velocity[1] = 0;
    rigidBodyComponentA.acceleration[1] = 0;
  }

  calculatePenetration(transformA: TransformComponent, collisionA: CollisionComponent, transformB: TransformComponent, collisionB: CollisionComponent): vec3 {
    // Get the positions and sizes of the two entities
    const positionA = transformA.position;
    const sizeA = collisionA.size;
    const positionB = transformB.position;
    const sizeB = collisionB.size;

    // Calculate the half sizes of the entities
    const halfSizeA = vec3.scale(vec3.create(), sizeA, 0.5);
    const halfSizeB = vec3.scale(vec3.create(), sizeB, 0.5);

    // Calculate the centers of the AABBs
    const centerA = vec3.add(vec3.create(), positionA, halfSizeA);
    const centerB = vec3.add(vec3.create(), positionB, halfSizeB);

    // Calculate the vector from the center of A to the center of B
    const d = vec3.subtract(vec3.create(), centerB, centerA);

    // Calculate the combined half sizes of the AABBs
    const combinedHalfSize = vec3.add(vec3.create(), halfSizeA, halfSizeB);

    // Calculate the overlap between the two AABBs along each axis
    const overlapX = Math.abs(d[0]) - combinedHalfSize[0];
    const overlapY = Math.abs(d[1]) - combinedHalfSize[1];
    const overlapZ = Math.abs(d[2]) - combinedHalfSize[2];

    // If there is an overlap along all axes, the entities are colliding
    if (overlapX < 0 && overlapY < 0 && overlapZ < 0) {
      // Calculate the penetration vector to move entityA outside of entityB
      const penetration = vec3.create();
      if (Math.abs(overlapX) < Math.abs(overlapY) && Math.abs(overlapX) < Math.abs(overlapZ)) {
        penetration[0] = overlapX * (d[0] < 0 ? -1 : 1);
      } else if (Math.abs(overlapY) < Math.abs(overlapZ)) {
        penetration[1] = overlapY * (d[1] < 0 ? -1 : 1);
      } else {
        penetration[2] = overlapZ * (d[2] < 0 ? -1 : 1);
      }

      return penetration;
    }

    // If there is no overlap along any axis, the entities are not colliding
    return vec3.create();
  }

  calculateAABB(transform: TransformComponent, collisionComponent: CollisionComponent): { minX: number; maxX: number; minY: number; maxY: number; minZ: number; maxZ: number } {
    // Calculate the AABB for an entity based on its position and size
    const position = transform.position;
    const size = collisionComponent.size;

    return {
      minX: position[0] - size[0] / 2,
      maxX: position[0] + size[0] / 2,
      minY: position[1] - size[1] / 2,
      maxY: position[1] + size[1] / 2,
      minZ: position[2] - size[2] / 2,
      maxZ: position[2] + size[2] / 2,
    };
  }
}
