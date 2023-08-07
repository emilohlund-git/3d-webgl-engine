import { mat4, vec3 } from "gl-matrix";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { TransformComponent } from "../components/TransformComponent";
import { RenderComponent } from "../components/rendering/RenderComponent";
import { Entity } from "../entities/Entity";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class TransformSystem extends System {
  async preload(entityManager: EntityManager) {
    const entities = entityManager.getEntitiesByComponents(["TransformComponent", "RenderComponent"]);
    this.preloadEntities(entities);
  }

  update(deltaTime: number, entityManager: EntityManager) {
    const entities = entityManager.getEntitiesByComponent("RigidBodyComponent");
    this.updateEntities(deltaTime, entities);
  }

  render() { }

  private preloadEntities(entities: Entity[]) {
    for (const entity of entities) {
      const transformComponent = entity.getComponent<TransformComponent>("TransformComponent");
      if (!transformComponent) continue;

      const modelMatrix = this.getModelMatrix(transformComponent);

      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) continue;

      const shaderProgram = renderComponent.shaderProgram;
      shaderProgram.use();

      shaderProgram.setUniformMatrix4fv("mMatrix", modelMatrix);
    };
  }

  private updateEntities(deltaTime: number, entities: Entity[]) {
    for (const entity of entities) {
      const rigidBodyComponent = entity.getComponent<RigidBodyComponent>("RigidBodyComponent");
      if (!rigidBodyComponent) continue;

      const transformComponent = entity.getComponent<TransformComponent>("TransformComponent");
      if (!transformComponent) continue;

      // Apply velocity to position based on deltaTime
      if (!rigidBodyComponent.isStatic)
        vec3.scaleAndAdd(transformComponent.position, transformComponent.position, rigidBodyComponent.velocity, deltaTime);

      const modelMatrix = this.getModelMatrix(transformComponent);

      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) continue;

      const shaderProgram = renderComponent.shaderProgram;
      shaderProgram.use();
      shaderProgram.setUniformMatrix4fv("mMatrix", modelMatrix);
    }
  }

  private getModelMatrix(transformComponent: TransformComponent): mat4 {
    const modelMatrix = mat4.create();

    mat4.translate(modelMatrix, modelMatrix, transformComponent.position);
    mat4.rotateX(modelMatrix, modelMatrix, transformComponent.rotation[0]);
    mat4.rotateY(modelMatrix, modelMatrix, transformComponent.rotation[1]);
    mat4.rotateZ(modelMatrix, modelMatrix, transformComponent.rotation[2]);
    mat4.scale(modelMatrix, modelMatrix, transformComponent.scale);

    return modelMatrix;
  }
}