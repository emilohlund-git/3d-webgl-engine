import { WebGLCanvas } from "../WebGLCanvas";
import { BufferManager } from "../buffers/BufferManager";
import { RenderComponent } from "../components/RenderComponent";
import { Entity } from "../entities/Entity";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class RenderSystem extends System {
  private entityManager: EntityManager;
  private bufferManager: BufferManager;
  private gl: WebGL2RenderingContext;
  private canvas: WebGLCanvas;

  constructor(canvas: WebGLCanvas, entityManager: EntityManager, bufferManager: BufferManager) {
    super();

    this.canvas = canvas;
    this.gl = canvas.gl;
    this.bufferManager = bufferManager;
    this.entityManager = entityManager;
  }

  async preload() {
    const entities = this.entityManager.getEntitiesByComponent("RenderComponent");
    await this.preloadBuffers(entities);
    this.canvas.setViewPort();
  }

  update() { }

  render() {
    this.canvas.clear();

    const entities = this.entityManager.getEntitiesByComponent("RenderComponent");
    entities.forEach(entity => {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) return;

      renderComponent.shaderProgram.use();

      this.bufferManager.bindBuffers(entity.id);

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