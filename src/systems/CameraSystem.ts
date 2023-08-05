import { mat4, quat, vec3 } from "gl-matrix";
import { InputManager } from "../InputManager";
import { ShaderProgram } from "../ShaderProgram";
import { WebGLCanvas } from "../WebGLCanvas";
import { Camera } from "../cameras/Camera";
import { OrbitCamera } from "../cameras/OrbitCamera";
import { RenderComponent } from "../components/RenderComponent";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class CameraSystem extends System {
  private camera: Camera;
  private inputManager: InputManager;
  private moveSpeed: number;
  private mouseSensitivity: number;
  private prevMouseX: number = 0;
  private prevMouseY: number = 0
  private projectionMatrix: mat4;
  private canvas: WebGLCanvas;

  constructor(
    mouseSensitivity: number,
    projectionMatrix: mat4,
    canvas: WebGLCanvas,
    moveSpeed: number = 0.1,
  ) {
    super();

    this.inputManager = new InputManager();
    this.moveSpeed = moveSpeed;
    this.camera = new OrbitCamera(vec3.create(), quat.create());
    this.mouseSensitivity = mouseSensitivity;
    this.projectionMatrix = projectionMatrix;
    this.canvas = canvas;
  }

  async preload() {
    mat4.perspective(this.projectionMatrix, 45, this.canvas.width / this.canvas.height, 0.1, 100);
  }

  update() {
    this.handleInput();
  }

  render(entityManager: EntityManager) {
    const renderEntities = entityManager.getEntitiesByComponent("RenderComponent");
    for (const entity of renderEntities) {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) continue;
      this.setMatrixUniforms(renderComponent.shaderProgram);
    }
  }

  private handleInput() {
    const moveAmount = this.moveSpeed * (this.inputManager.isKeyPressed("Shift") ? 3 : 1);

    if (this.inputManager.isKeyPressed("w")) {
      this.camera.moveForward(moveAmount);
    } else if (this.inputManager.isKeyPressed("s")) {
      this.camera.moveBackward(moveAmount);
    }

    if (this.inputManager.isKeyPressed("a")) {
      this.camera.moveLeft(moveAmount);
    } else if (this.inputManager.isKeyPressed("d")) {
      this.camera.moveRight(moveAmount);
    }

    if (this.inputManager.isMouseButtonDown(0)) {
      const deltaX = (this.inputManager.getMouseX() - this.prevMouseX) * this.mouseSensitivity;
      const deltaY = (this.inputManager.getMouseY() - this.prevMouseY) * this.mouseSensitivity;

      this.camera.rotate(-deltaY, -deltaX);
    }

    this.prevMouseX = this.inputManager.getMouseX();
    this.prevMouseY = this.inputManager.getMouseY();
  }

  private setMatrixUniforms(shaderProgram: ShaderProgram) {
    shaderProgram.use();
    shaderProgram.setUniformMatrix4fv("pMatrix", this.projectionMatrix);
    shaderProgram.setUniformMatrix4fv("vMatrix", this.camera.getViewMatrix());
  }
}
