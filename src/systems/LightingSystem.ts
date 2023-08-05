import { vec3 } from "gl-matrix";
import { LightingComponent } from "../components/LightingComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class LightingSystem extends System {
  async preload() { }

  update(deltaTime: number, entityManager: EntityManager) {
    const entitiesWithLighting = entityManager.getEntitiesByComponent("LightingComponent");
    const entitiesWithRender = entityManager.getEntitiesByComponent("RenderComponent");

    entitiesWithRender.forEach((renderEntity) => {
      const renderComponent = renderEntity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) return;

      const renderTransformComponent = renderEntity.getComponent<TransformComponent>("TransformComponent");
      if (!renderTransformComponent) return;

      let combinedLightColor = vec3.create();

      entitiesWithLighting.forEach((lightEntity) => {
        const lightingComponent = lightEntity.getComponent<LightingComponent>("LightingComponent");
        if (!lightingComponent) return;

        const lightingTransformComponent = lightEntity.getComponent<TransformComponent>("TransformComponent");
        if (!lightingTransformComponent) return;

        const lightColor: vec3 = lightingComponent.color;
        const lightIntensity: number = lightingComponent.intensity;
        const lightPosition: vec3 = lightingTransformComponent.position;

        // Calculate the light direction
        const lightDirection: vec3 = vec3.create();
        vec3.subtract(lightDirection, renderTransformComponent.position, lightPosition);
        vec3.normalize(lightDirection, lightDirection);

        // Accumulate the light's contribution to the combined light color
        vec3.scaleAndAdd(combinedLightColor, combinedLightColor, lightColor, lightIntensity);
        lightingComponent.direction = lightDirection;
        lightingComponent.combinedLightColor = combinedLightColor;
      });
    });
  }

  render() { }
}