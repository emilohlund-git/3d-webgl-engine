import { mat4 } from "gl-matrix";
import { ShaderProgram } from "../ShaderProgram";
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
  private projectionMatrix: mat4;

  constructor(
    canvas: WebGLCanvas,
    entityManager: EntityManager,
    bufferManager: BufferManager,
    projectionMatrix: mat4,
  ) {
    super();

    this.canvas = canvas;
    this.gl = canvas.gl;
    this.bufferManager = bufferManager;
    this.entityManager = entityManager;
    this.projectionMatrix = projectionMatrix;
  }

  preload() {
    mat4.perspective(this.projectionMatrix, 45, this.canvas.width / this.canvas.height, 0.1, 100);
  }

  update(deltaTime: number) {
    const entities = this.entityManager.getEntitiesByComponents(["TransformComponent", "RenderComponent"]);

    for (const entity of entities) {
      const transformComponent = entity.getComponent<TransformComponent>("TransformComponent");
      if (!transformComponent) continue;

      const modelMatrix = transformComponent.getModelMatrix();
      mat4.rotateZ(modelMatrix, modelMatrix, 0.001 * deltaTime);
      mat4.rotateX(modelMatrix, modelMatrix, 0.001 * deltaTime);
      mat4.rotateY(modelMatrix, modelMatrix, 0.001 * deltaTime);

      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) continue;

      const shaderProgram = renderComponent.shaderProgram;
      this.setMatrixUniforms(shaderProgram, modelMatrix);

      this.bufferManager.associateVBOWithAttribute(entity.id, shaderProgram, "coordinates", 3, this.gl.FLOAT, 0, 0);
      this.bufferManager.associateIBOWithAttribute(entity.id, shaderProgram, "coordinates", 3, this.gl.FLOAT, 0, 0);
      this.bufferManager.associateColorBufferWithAttribute(entity.id, shaderProgram, "color", 3, this.gl.FLOAT, 0, 0);
    };
  }

  render() { }

  private setMatrixUniforms(shaderProgram: ShaderProgram, modelMatrix: mat4) {
    shaderProgram.setUniformMatrix4fv("pMatrix", this.projectionMatrix);
    shaderProgram.setUniformMatrix4fv("mMatrix", modelMatrix);
  }
}