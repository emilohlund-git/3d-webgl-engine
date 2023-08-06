import { mat4 } from "gl-matrix";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Entity } from "../entities/Entity";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class TransformSystem extends System {
  async preload(entityManager: EntityManager) {
    const entities = entityManager.getEntitiesByComponents(["TransformComponent", "RenderComponent"]);
    this.preloadEntities(entities);
  }

  update(_: number, entityManager: EntityManager) { }

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

  private getModelMatrix(transformComponent: TransformComponent): mat4 {
    mat4.translate(transformComponent.modelMatrix, transformComponent.modelMatrix, transformComponent.position);
    mat4.rotateX(transformComponent.modelMatrix, transformComponent.modelMatrix, transformComponent.rotation[0]);
    mat4.rotateY(transformComponent.modelMatrix, transformComponent.modelMatrix, transformComponent.rotation[1]);
    mat4.rotateZ(transformComponent.modelMatrix, transformComponent.modelMatrix, transformComponent.rotation[2]);
    mat4.scale(transformComponent.modelMatrix, transformComponent.modelMatrix, transformComponent.scale);

    return transformComponent.modelMatrix;
  }
}