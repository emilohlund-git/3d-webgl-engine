import { WebGLCanvas } from "../WebGLCanvas";
import { BufferManager } from "../buffers/BufferManager";
import { LightComponent } from "../components/LightComponent";
import { MaterialComponent } from "../components/MaterialComponent";
import { RenderComponent } from "../components/RenderComponent";
import { Entity } from "../entities/Entity";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class RenderSystem extends System {
  private bufferManager: BufferManager;
  private gl: WebGL2RenderingContext;
  private canvas: WebGLCanvas;

  constructor(canvas: WebGLCanvas, bufferManager: BufferManager) {
    super();

    this.canvas = canvas;
    this.gl = canvas.gl;
    this.bufferManager = bufferManager;
  }

  async preload(entityManager: EntityManager) {
    const entities = entityManager.getEntitiesByComponent("RenderComponent");
    await this.preloadBuffers(entities);
    this.canvas.setViewPort();
  }

  update() { }

  render(entityManager: EntityManager) {
    this.canvas.clear();

    const entities = entityManager.getEntitiesByComponent("RenderComponent");
    entities.forEach(entity => {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) return;

      const materialComponent = entity.getComponent<MaterialComponent>("MaterialComponent");

      renderComponent.shaderProgram.use();

      const lightComponent = entity.getComponent<LightComponent>("LightComponent");
      if (lightComponent) {
        renderComponent.shaderProgram.setUniform3f("lightColor", lightComponent.color);
        renderComponent.shaderProgram.setUniform1f("lightIntensity", lightComponent.intensity);
        renderComponent.shaderProgram.setUniform3f("lightDirection", lightComponent.direction);
        // Set uniform for ambient light
        renderComponent.shaderProgram.setUniform3f("ambientLightColor", lightComponent.combinedLightColor);
        renderComponent.shaderProgram.setUniform1f("ambientLightIntensity", 0.4); // Adjust intensity as needed
      }

      if (materialComponent) {
        renderComponent.shaderProgram.setUniform3f("materialColor", materialComponent.color);
      }

      this.bufferManager.bindBuffers(entity.id);
      if (renderComponent.normals.length > 0) {
        this.bufferManager.associateVBOWithAttribute(entity.id, renderComponent.shaderProgram, "normal", 3, this.gl.FLOAT, 0, 0);
      }
      this.bufferManager.associateVBOWithAttribute(entity.id, renderComponent.shaderProgram, "position", 3, this.gl.FLOAT, 0, 0);
      this.gl.drawElements(this.gl.TRIANGLES, renderComponent.indices.length, this.gl.UNSIGNED_SHORT, 0);
    });
  }

  private async preloadBuffers(entities: Entity[]) {
    for (const entity of entities) {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) continue;

      renderComponent.shaderProgram.use();
      this.bufferManager.createBuffers(entity.id, renderComponent);
    }
  }
}