import { mat4 } from "gl-matrix";
import { WebGLCanvas } from "../WebGLCanvas";
import { BufferManager } from "../buffers/BufferManager";
import { Camera } from "../cameras/Camera";
import { LightComponent } from "../components/LightComponent";
import { MaterialComponent } from "../components/MaterialComponent";
import { RenderComponent } from "../components/RenderComponent";
import { SkyboxComponent } from "../components/SkyboxComponent";
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

    this.renderSkybox(entityManager);
    this.renderEntities(entityManager);
  }

  private async preloadBuffers(entities: Entity[]) {
    for (const entity of entities) {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) continue;

      renderComponent.shaderProgram.use();
      this.bufferManager.createBuffers(entity.id, renderComponent);
    }
  }

  private renderSkybox(entityManager: EntityManager) {
    const skyboxEntity = entityManager.getEntitiesByComponent("SkyboxComponent")[0];
    if (skyboxEntity) {
      const skyboxRenderComponent = skyboxEntity.getComponent<RenderComponent>("RenderComponent");
      if (skyboxRenderComponent) {
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
    }
  }

  private renderEntities(entityManager: EntityManager) {
    const entities = entityManager.getEntitiesByComponent("RenderComponent");
    for (const entity of entities) {
      const skyboxComponent = entity.getComponent<SkyboxComponent>("SkyboxComponent");
      if (skyboxComponent) continue;
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) continue;

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
        if (materialComponent.texture) {
          renderComponent.shaderProgram.use();
          renderComponent.shaderProgram.setUniform1i("textureSampler", 0); // Use texture unit 0
          this.gl.activeTexture(this.gl.TEXTURE0);
          this.gl.bindTexture(this.gl.TEXTURE_2D, materialComponent.texture);
        }
      }

      this.bufferManager.bindBuffers(entity.id);
      if (renderComponent.normals.length > 0) {
        this.bufferManager.associateVBOWithAttribute(entity.id, renderComponent.shaderProgram, "normal", 3, this.gl.FLOAT, 0, 0);
      }
      this.bufferManager.associateVBOWithAttribute(entity.id, renderComponent.shaderProgram, "position", 3, this.gl.FLOAT, 0, 0);
      this.bufferManager.associateUVWithAttribute(entity.id, renderComponent.shaderProgram, "uv", 2, this.gl.FLOAT, 0, 0);
      this.gl.drawElements(this.gl.TRIANGLES, renderComponent.indices.length, this.gl.UNSIGNED_SHORT, 0);
    }
  }
}