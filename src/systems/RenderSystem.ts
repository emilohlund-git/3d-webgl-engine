import { WebGLCanvas } from "../WebGLCanvas";
import { BufferManager } from "../buffers/BufferManager";
import { LightingComponent } from "../components/LightingComponent";
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

      renderComponent.shaderProgram.use();

      const lightingComponent = entity.getComponent<LightingComponent>("LightingComponent");
      if (lightingComponent) {
        renderComponent.shaderProgram.setUniform3f("lightColor", lightingComponent.color);
        renderComponent.shaderProgram.setUniform1f("lightIntensity", lightingComponent.intensity);
        renderComponent.shaderProgram.setUniform3f("lightDirection", lightingComponent.direction);
        // Set uniform for ambient light
        renderComponent.shaderProgram.setUniform3f("ambientLightColor", lightingComponent.combinedLightColor);
        renderComponent.shaderProgram.setUniform1f("ambientLightIntensity", 0.4); // Adjust intensity as needed
      }

      this.bufferManager.bindBuffers(entity.id);
      if (renderComponent.normals.length > 0) {
        this.bufferManager.associateVBOWithAttribute(entity.id, renderComponent.shaderProgram, "normal", 3, this.gl.FLOAT, 0, 0);
      }
      this.bufferManager.associateVBOWithAttribute(entity.id, renderComponent.shaderProgram, "position", 3, this.gl.FLOAT, 0, 0);
      this.bufferManager.associateColorBufferWithAttribute(entity.id, renderComponent.shaderProgram, "color", 3, this.gl.FLOAT, 0, 0);
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