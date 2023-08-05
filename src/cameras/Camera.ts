import { mat4, quat, vec3 } from "gl-matrix";

export abstract class Camera {
  protected position: vec3;
  protected orientation: quat;

  constructor(position: vec3, orientation: quat) {
    this.position = position;
    this.orientation = orientation;
  }

  abstract moveForward(amount: number): void;
  abstract moveBackward(amount: number): void;
  abstract moveLeft(amount: number): void;
  abstract moveRight(amount: number): void;
  abstract rotate(pitch: number, yaw: number): void;

  getViewMatrix(): mat4 {
    const viewMatrix = mat4.create();
    const inverseCameraPosition = vec3.create();
    vec3.negate(inverseCameraPosition, this.position);
    mat4.translate(viewMatrix, viewMatrix, inverseCameraPosition);

    const cameraRotationMat = mat4.create();
    mat4.fromQuat(cameraRotationMat, this.orientation);
    mat4.multiply(viewMatrix, viewMatrix, cameraRotationMat);

    mat4.invert(viewMatrix, viewMatrix);
    return viewMatrix;
  }
}