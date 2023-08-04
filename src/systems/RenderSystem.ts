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

  preload() {
    const entities = this.entityManager.getEntitiesByComponent("RenderComponent");
    this.preloadEntities(entities);
    this.canvas.setViewPort();
  }

  update() { }

  render() {
    this.canvas.clear();

    // Loop through the entities and render them
    const entities = this.entityManager.getEntitiesByComponent("RenderComponent");
    entities.forEach(entity => {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) return;

      this.gl.drawElements(this.gl.TRIANGLES, renderComponent.indices.length, this.gl.UNSIGNED_SHORT, 0);
    });
  }

  private preloadEntities(entities: Entity[]) {
    for (const entity of entities) {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) return;

      this.bufferManager.createVBO(entity.id, new Float32Array(renderComponent.vertices));
      this.bufferManager.createIBO(entity.id, new Uint16Array(renderComponent.indices));
      this.bufferManager.createColorBuffer(entity.id, new Float32Array(renderComponent.colors));

      this.bufferManager.bindVBO(entity.id);
      this.bufferManager.bindIBO(entity.id);
    }
  }
}