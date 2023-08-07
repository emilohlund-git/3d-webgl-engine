import { vec3 } from "gl-matrix";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "../entities/EntityManager";
import { GRAVITY } from "../utils/constants";
import { System } from "./System";

export class PhysicsSystem extends System {
  async preload() { }

  update(deltaTime: number, entityManager: EntityManager) {
    const physicsEntities = entityManager.getEntitiesByComponent("RigidBodyComponent");

    // Calculate gravitational force for each rigid body
    for (const entity of physicsEntities) {
      const rigidBodyComponent = entity.getComponent<RigidBodyComponent>("RigidBodyComponent");
      if (!rigidBodyComponent) continue;

      const transformComponent = entity.getComponent<TransformComponent>("TransformComponent");
      if (!transformComponent) continue;

      const gravitationalForce = vec3.fromValues(0, -GRAVITY, 0);
      vec3.scale(gravitationalForce, gravitationalForce, rigidBodyComponent.mass);

      // Apply gravitational force to acceleration
      vec3.add(rigidBodyComponent.acceleration, rigidBodyComponent.acceleration, gravitationalForce);

      // Update velocity and position based on acceleration and deltaTime
      vec3.scaleAndAdd(rigidBodyComponent.velocity, rigidBodyComponent.velocity, rigidBodyComponent.acceleration, deltaTime);
    }
  }

  render() { }
}
