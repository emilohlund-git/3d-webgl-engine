import { vec3 } from "gl-matrix";
import { LightComponent } from "../components/LightComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { SpotLightComponent } from "../components/lights/SpotLightComponent";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class LightingSystem extends System {
  async preload() { }

  update(deltaTime: number, entityManager: EntityManager) {
    const entitiesWithLighting = entityManager.getEntitiesByComponent("LightComponent");
    const entitiesWithRender = entityManager.getEntitiesByComponent("RenderComponent");

    entitiesWithRender.forEach((renderEntity) => {
      const renderComponent = renderEntity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) return;

      const renderTransformComponent = renderEntity.getComponent<TransformComponent>("TransformComponent");
      if (!renderTransformComponent) return;

      let combinedLightColor = vec3.create();

      entitiesWithLighting.forEach((lightEntity) => {
        const lightingComponent = lightEntity.getComponent<LightComponent>("LightComponent");
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

        // Calculate the light distance for attenuation (assuming it's already set in the LightComponent)
        const lightDistance: number = vec3.distance(renderTransformComponent.position, lightPosition);

        // Calculate the light attenuation factor (you can adjust this formula based on your needs)
        const attenuationFactor: number = 1.0 / (1.0 + lightDistance * lightIntensity);

        if (lightingComponent instanceof SpotLightComponent) {
          // Spotlight calculations
          const lightCutoffAngle: number = lightingComponent.cutoffAngle;

          // Calculate the angle between the light direction and the direction to the render entity
          const angleToLight: number = vec3.angle(lightDirection, renderTransformComponent.position);

          // If the angle is within the spotlight's cone, apply lighting
          if (angleToLight <= lightCutoffAngle) {
            // Calculate the spotlight intensity based on the angle
            const spotlightIntensity: number = 1.0 - angleToLight / lightCutoffAngle;

            // Accumulate the light's contribution to the combined light color
            vec3.scaleAndAdd(combinedLightColor, combinedLightColor, lightColor, spotlightIntensity * attenuationFactor);
          }
        }

        // Apply the combined light color to the render entity's material or lighting calculations
        lightingComponent.combinedLightColor = combinedLightColor;
      });
    });
  }

  render() { }
}