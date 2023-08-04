import { mat4 } from "gl-matrix";
import { VBO } from "../VBO";
import { WebGLCanvas } from "../WebGLCanvas";
import { RenderComponent } from "../components/RenderComponent";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class RenderSystem extends System {
  private vbo: VBO;
  private entityManager: EntityManager;
  private gl: WebGL2RenderingContext;
  private canvas: WebGLCanvas;

  constructor(canvas: WebGLCanvas, entityManager: EntityManager) {
    super();

    this.canvas = canvas;
    this.gl = canvas.gl;
    this.vbo = new VBO(this.gl);
    this.entityManager = entityManager;
  }

  preload() {
    const entities = this.entityManager.getEntitiesByComponent("RenderComponent");
    entities.forEach(entity => {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) return;

      this.vbo.createVertexBuffer(entity.id, renderComponent.vertexData);
    });
  }

  update() {
    const entities = this.entityManager.getEntitiesByComponent("RenderComponent");
    entities.forEach(entity => {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) return;

      renderComponent.position[0] += 0.01;
      renderComponent.position[1] += 0.01;
      renderComponent.position[2] += 0.01;
    });
  }

  render() {
    this.canvas.clear();
    this.canvas.setViewPort();

    // Loop through the entities and render them
    const entities = this.entityManager.getEntitiesByComponent("RenderComponent");
    entities.forEach(entity => {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) return;

      const buffer = this.vbo.getBuffer(entity.id);
      if (!buffer) return;

      const modelMatrix = mat4.create();
      mat4.translate(modelMatrix, modelMatrix, renderComponent.position);

      renderComponent.shaderProgram.setUniformMatrix4fv("uModelMatrix", modelMatrix);

      this.vbo.associateWithAttribute(entity.id, renderComponent.shaderProgram.program!, "coordinates", 2, this.gl.FLOAT, 0, 0);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    });
  }
}