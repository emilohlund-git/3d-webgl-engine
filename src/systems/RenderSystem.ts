import { mat4 } from "gl-matrix";
import { WebGLCanvas } from "../WebGLCanvas";
import { ColorBuffer } from "../buffers/ColorBuffer";
import { IBO } from "../buffers/IBO";
import { VBO } from "../buffers/VBO";
import { RenderComponent } from "../components/RenderComponent";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class RenderSystem extends System {
  private vbo: VBO;
  private ibo: IBO;
  private colorBuffer: ColorBuffer;
  private entityManager: EntityManager;
  private gl: WebGL2RenderingContext;
  private canvas: WebGLCanvas;

  constructor(canvas: WebGLCanvas, entityManager: EntityManager) {
    super();

    this.canvas = canvas;
    this.gl = canvas.gl;
    this.vbo = new VBO(this.gl);
    this.ibo = new IBO(this.gl);
    this.colorBuffer = new ColorBuffer(this.gl);
    this.entityManager = entityManager;
  }

  preload() {
    const entities = this.entityManager.getEntitiesByComponent("RenderComponent");
    entities.forEach(entity => {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) return;

      this.vbo.createBuffer(entity.id, new Float32Array(renderComponent.vertices));
      this.ibo.createBuffer(entity.id, new Uint16Array(renderComponent.indices));
      this.colorBuffer.createBuffer(entity.id, new Float32Array(renderComponent.colors));
    });

    this.canvas.setViewPort();
  }

  update() {
    const entities = this.entityManager.getEntitiesByComponent("RenderComponent");
    entities.forEach(entity => {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) return;
    });
  }

  render() {
    this.canvas.clear();

    // Loop through the entities and render them
    const entities = this.entityManager.getEntitiesByComponent("RenderComponent");
    entities.forEach(entity => {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) return;

      const modelMatrix = mat4.create();
      mat4.translate(modelMatrix, modelMatrix, renderComponent.position);

      renderComponent.shaderProgram.setUniformMatrix4fv("uModelMatrix", modelMatrix);

      this.vbo.associateWithAttribute(entity.id, renderComponent.shaderProgram.program!, "coordinates", 3, this.gl.FLOAT, 0, 0);
      this.ibo.associateWithAttribute(entity.id, renderComponent.shaderProgram.program!, "coordinates", 3, this.gl.FLOAT, 0, 0);
      this.colorBuffer.associateWithAttribute(entity.id, renderComponent.shaderProgram.program!, "color", 3, this.gl.FLOAT, 0, 0);

      this.gl.drawElements(this.gl.TRIANGLES, renderComponent.indices.length, this.gl.UNSIGNED_SHORT, 0);
    });
  }
}