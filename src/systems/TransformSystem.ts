import { mat4 } from "gl-matrix";
import { ShaderProgram } from "../ShaderProgram";
import { WebGLCanvas } from "../WebGLCanvas";
import { BufferManager } from "../buffers/BufferManager";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class TransformSystem extends System {
  private bufferManager: BufferManager;
  private gl: WebGL2RenderingContext;

  constructor(
    canvas: WebGLCanvas,
    bufferManager: BufferManager,
  ) {
    super();

    this.gl = canvas.gl;
    this.bufferManager = bufferManager;
  }

  async preload() {
  }

  update(deltaTime: number, entityManager: EntityManager) {
    const entities = entityManager.getEntitiesByComponents(["TransformComponent", "RenderComponent"]);

    for (const entity of entities) {
      const transformComponent = entity.getComponent<TransformComponent>("TransformComponent");
      if (!transformComponent) continue;

      const modelMatrix = transformComponent.getModelMatrix();

      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) continue;

      const shaderProgram = renderComponent.shaderProgram;
      shaderProgram.use();

      this.setMatrixUniforms(shaderProgram, modelMatrix);

      // For VBO (vertex positions)
    };
  }

  render() { }

  private setMatrixUniforms(shaderProgram: ShaderProgram, modelMatrix: mat4) {
    shaderProgram.setUniformMatrix4fv("mMatrix", modelMatrix);
  }
}