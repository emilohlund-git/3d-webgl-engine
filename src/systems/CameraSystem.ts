import { mat4, quat, vec3 } from "gl-matrix";
import { InputManager } from "../InputManager";
import { ShaderProgram } from "../ShaderProgram";
import { CameraComponent } from "../components/CameraComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Entity } from "../entities/Entity";
import { EntityManager } from "../entities/EntityManager";
import { System } from "./System";

export class CameraSystem extends System {
  private entityManager: EntityManager;
  private viewMatrix: mat4;
  private inputManager: InputManager;
  private moveSpeed: number;
  private mouseSensitivity: number;
  private cameraOrientation: quat; // Quaternion to represent camera orientation
  private cameraPosition: vec3; // Vector to represent camera position
  private prevMouseX: number = 0;
  private prevMouseY: number = 0

  constructor(
    entityManager: EntityManager,
    inputManager: InputManager,
    mouseSensitivity: number,
    moveSpeed: number = 0.1,
  ) {
    super();

    this.viewMatrix = mat4.create();
    this.entityManager = entityManager;
    this.inputManager = inputManager;
    this.moveSpeed = moveSpeed;
    this.mouseSensitivity = mouseSensitivity;
    this.cameraOrientation = quat.create(); // Initialize camera orientation as identity quaternion (no rotation)
    this.cameraPosition = vec3.create(); // Initialize camera position as the origin
  }

  preload() { }

  update() {
    const tempViewMatrix = mat4.clone(this.viewMatrix);

    const cameraEntity = this.entityManager.getEntitiesByComponent("CameraComponent")[0];
    if (cameraEntity) {
      this.handleInput(cameraEntity);
      const cameraTransform = cameraEntity.getComponent<TransformComponent>("TransformComponent");
      const cameraComponent = cameraEntity.getComponent<CameraComponent>("CameraComponent");
      if (cameraTransform && cameraComponent) {
        mat4.identity(tempViewMatrix);

        // Apply the inverse translation of the camera position
        const inverseCameraPosition = vec3.create();
        vec3.negate(inverseCameraPosition, this.cameraPosition);
        mat4.translate(tempViewMatrix, tempViewMatrix, inverseCameraPosition);

        // Apply the camera's rotation to the view matrix
        const cameraRotationMat = mat4.create();
        mat4.fromQuat(cameraRotationMat, this.cameraOrientation);
        mat4.multiply(tempViewMatrix, tempViewMatrix, cameraRotationMat);

        // Invert the matrix to get the view matrix
        mat4.invert(tempViewMatrix, tempViewMatrix);
      }
    }

    this.viewMatrix = tempViewMatrix;
  }

  render() {
    const renderEntities = this.entityManager.getEntitiesByComponent("RenderComponent");
    for (const entity of renderEntities) {
      const renderComponent = entity.getComponent<RenderComponent>("RenderComponent");
      if (!renderComponent) continue;
      this.setMatrixUniforms(renderComponent.shaderProgram);
    }
  }

  handleInput(cameraEntity: Entity) {
    const transformComponent = cameraEntity.getComponent<TransformComponent>("TransformComponent");

    if (!transformComponent) return;

    const right = this.getRightVector();

    const moveAmount = this.moveSpeed * (this.inputManager.isKeyPressed("Shift") ? 3 : 1);

    // Move forward and backward
    if (this.inputManager.isKeyPressed("w")) {
      // Calculate the new forward direction after applying the camera's orientation
      const forwardDirection = vec3.transformQuat(vec3.create(), vec3.fromValues(0, 0, -1), this.cameraOrientation);
      vec3.normalize(forwardDirection, forwardDirection);
      // Move the camera position in the new forward direction
      vec3.scaleAndAdd(this.cameraPosition, this.cameraPosition, forwardDirection, -moveAmount);
    } else if (this.inputManager.isKeyPressed("s")) {
      // Calculate the new backward direction after applying the camera's orientation
      const backwardDirection = vec3.transformQuat(vec3.create(), vec3.fromValues(0, 0, 1), this.cameraOrientation);
      vec3.normalize(backwardDirection, backwardDirection);
      // Move the camera position in the new backward direction
      vec3.scaleAndAdd(this.cameraPosition, this.cameraPosition, backwardDirection, -moveAmount);
    }

    // Strafe left and right
    if (this.inputManager.isKeyPressed("a")) {
      // Move the camera position in the left direction
      vec3.scaleAndAdd(this.cameraPosition, this.cameraPosition, right, moveAmount);
    } else if (this.inputManager.isKeyPressed("d")) {
      // Move the camera position in the right direction
      vec3.scaleAndAdd(this.cameraPosition, this.cameraPosition, right, -moveAmount);
    }

    // Update the camera position based on the transform component
    vec3.copy(transformComponent.position, this.cameraPosition);

    // Camera rotation using mouse movement
    if (this.inputManager.isMouseButtonDown(0)) {
      const deltaX = (this.inputManager.getMouseX() - this.prevMouseX) * this.mouseSensitivity;
      const deltaY = (this.inputManager.getMouseY() - this.prevMouseY) * this.mouseSensitivity;

      this.rotateCamera(-deltaY, -deltaX);
    }

    // Update previous mouse position
    this.prevMouseX = this.inputManager.getMouseX();
    this.prevMouseY = this.inputManager.getMouseY();
  }

  private rotateCamera(pitch: number, yaw: number) {
    // Create quaternions for pitch and yaw rotations
    const pitchQuat = quat.create();
    quat.setAxisAngle(pitchQuat, [1, 0, 0], pitch);
    const yawQuat = quat.create();
    quat.setAxisAngle(yawQuat, [0, 1, 0], yaw);

    // Apply pitch and yaw rotations in the correct order
    quat.multiply(this.cameraOrientation, pitchQuat, this.cameraOrientation);
    quat.multiply(this.cameraOrientation, this.cameraOrientation, yawQuat);

    // Normalize the camera orientation to avoid drift over time
    quat.normalize(this.cameraOrientation, this.cameraOrientation);
  }

  private getRightVector(): vec3 {
    const right = vec3.fromValues(1, 0, 0); // Default right vector in the positive x-axis
    return vec3.transformQuat(vec3.create(), right, this.cameraOrientation);
  }

  private setMatrixUniforms(shaderProgram: ShaderProgram) {
    shaderProgram.setUniformMatrix4fv("vMatrix", this.viewMatrix);
  }
}
