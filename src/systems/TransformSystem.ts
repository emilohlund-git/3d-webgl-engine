import { mat4 } from "gl-matrix";
import { WebGLCanvas } from "../WebGLCanvas";
import { BufferManager } from "../buffers/BufferManager";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class TransformSystem extends System {
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

  preload() { }

  update(deltaTime: number) {
    const entities = this.entityManager.getEntitiesByComponent("RenderComponent");
    entities.forEach(entity => {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      const transformComponent = entity.getComponent<TransformComponent>("TransformComponent");
      if (!renderComponent || !transformComponent) return;

      const modelMatrix = transformComponent.getModelMatrix();

      const projectionMatrix = mat4.create();
      mat4.perspective(projectionMatrix, 45, this.canvas.width / this.canvas.height, 0.1, 100);

      const viewMatrix = mat4.create();

      mat4.rotateZ(modelMatrix, modelMatrix, 0.001 * deltaTime);
      mat4.rotateX(modelMatrix, modelMatrix, 0.001 * deltaTime);
      mat4.rotateY(modelMatrix, modelMatrix, 0.001 * deltaTime);

      viewMatrix[14] = viewMatrix[14] - 6;

      renderComponent.shaderProgram.setUniformMatrix4fv("pMatrix", projectionMatrix);
      renderComponent.shaderProgram.setUniformMatrix4fv("vMatrix", viewMatrix);
      renderComponent.shaderProgram.setUniformMatrix4fv("mMatrix", modelMatrix);

      this.bufferManager.associateVBOWithAttribute(entity.id, renderComponent.shaderProgram, "coordinates", 3, this.gl.FLOAT, 0, 0);
      this.bufferManager.associateIBOWithAttribute(entity.id, renderComponent.shaderProgram, "coordinates", 3, this.gl.FLOAT, 0, 0);
      this.bufferManager.associateColorBufferWithAttribute(entity.id, renderComponent.shaderProgram, "color", 3, this.gl.FLOAT, 0, 0);
    });
  }

  render() { }
}