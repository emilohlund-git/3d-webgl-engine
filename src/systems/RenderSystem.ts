import { mat4 } from "gl-matrix";
import { WebGLCanvas } from "../WebGLCanvas";
import { BufferManager } from "../buffers/BufferManager";
import { Camera } from "../cameras/Camera";
import { LightComponent } from "../components/LightComponent";
import { MaterialComponent } from "../components/MaterialComponent";
import { RenderComponent } from "../components/rendering/RenderComponent";
import { Entity } from "../entities/Entity";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class RenderSystem extends System {
  private bufferManager: BufferManager;
  private gl: WebGL2RenderingContext;
  private canvas: WebGLCanvas;
  private camera: Camera;
  private projectionMatrix: mat4;

  constructor(canvas: WebGLCanvas, bufferManager: BufferManager, camera: Camera, projectionMatrix: mat4) {
    super();

    this.canvas = canvas;
    this.gl = canvas.gl;
    this.bufferManager = bufferManager;
    this.camera = camera;
    this.projectionMatrix = projectionMatrix;
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

    const skyboxEntity = entities.find((e) => e.hasComponent("SkyboxComponent"));
    const renderEntities = entities.filter((e) => !e.hasComponent("SkyboxComponent"));

    if (skyboxEntity) {
      this.renderSkybox(skyboxEntity);
    }

    this.renderEntities(renderEntities);
  }

  private async preloadBuffers(entities: Entity[]) {
    for (const entity of entities) {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) continue;

      renderComponent.shaderProgram.use();
      this.bufferManager.createBuffers(entity.id, renderComponent);
    }
  }

  private renderSkybox(skyboxEntity: Entity) {
    const skyboxRenderComponent = skyboxEntity.getComponent<RenderComponent>("RenderComponent");
    if (!skyboxRenderComponent) return;
    const materialComponent = skyboxEntity.getComponent<MaterialComponent>("MaterialComponent");
    if (!materialComponent) return;

    skyboxRenderComponent.shaderProgram.use();
    skyboxRenderComponent.shaderProgram.setUniform1i("skybox", 0); // Use texture unit 0
    skyboxRenderComponent.shaderProgram.setUniformMatrix4fv("view", this.camera.getViewMatrix());
    skyboxRenderComponent.shaderProgram.setUniformMatrix4fv("projection", this.projectionMatrix);

    // Bind the cube map texture to texture unit 0
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, materialComponent.texture!);
    this.bufferManager.bindBuffers(skyboxEntity.id);
    this.bufferManager.associateVBOWithAttribute(skyboxEntity.id, skyboxRenderComponent.shaderProgram, "position", 3, this.gl.FLOAT, 0, 0);
    this.gl.drawElements(this.gl.TRIANGLES, skyboxRenderComponent.indices.length, this.gl.UNSIGNED_SHORT, 0);
  }

  private renderEntities(entities: Entity[]) {
    for (const entity of entities) {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) continue;

      const materialComponent = entity.getComponent<MaterialComponent>("MaterialComponent");
      if (!materialComponent) continue;

      renderComponent.shaderProgram.use();
      this.setupShaderProgramUniforms(entity, renderComponent, materialComponent);

      this.bufferManager.bindBuffers(entity.id);
      if (renderComponent.normals.length > 0) {
        this.bufferManager.associateVBOWithAttribute(entity.id, renderComponent.shaderProgram, "normal", 3, this.gl.FLOAT, 0, 0);
      }
      this.bufferManager.associateVBOWithAttribute(entity.id, renderComponent.shaderProgram, "position", 3, this.gl.FLOAT, 0, 0);

      // Terrain components calculate their UV mappings on the GPU
      if (renderComponent.uvs)
        this.bufferManager.associateUVWithAttribute(entity.id, renderComponent.shaderProgram, "uv", 2, this.gl.FLOAT, 0, 0);
      this.gl.drawElements(this.gl.TRIANGLES, renderComponent.indices.length, this.gl.UNSIGNED_SHORT, 0);
    }
  }

  private setupShaderProgramUniforms(entity: Entity, renderComponent: RenderComponent, materialComponent: MaterialComponent) {
    const shaderProgram = renderComponent.shaderProgram;
    shaderProgram.setUniform3f("materialColor", materialComponent.color);

    if (materialComponent.texture) {
      shaderProgram.setUniform1i("textureSampler", 0); // Use texture unit 0
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, materialComponent.texture);
    }

    const lightComponent = entity.getComponent<LightComponent>("LightComponent");
    if (lightComponent) {
      shaderProgram.setUniform3f("lightColor", lightComponent.color);
      shaderProgram.setUniform1f("lightIntensity", lightComponent.intensity);
      shaderProgram.setUniform3f("lightDirection", lightComponent.direction);
      shaderProgram.setUniform3f("ambientLightColor", lightComponent.combinedLightColor);
      shaderProgram.setUniform1f("ambientLightIntensity", 0.4); // Adjust intensity as needed
    }
  }
}