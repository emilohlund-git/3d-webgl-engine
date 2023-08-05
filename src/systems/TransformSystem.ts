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

      const modelMatrix = transformComponent.getModelMatrix();

      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) continue;

      const shaderProgram = renderComponent.shaderProgram;
      shaderProgram.use();

      shaderProgram.setUniformMatrix4fv("mMatrix", modelMatrix);
    };
  }
}