import { quat, vec3 } from "gl-matrix";
import { Camera } from "./Camera";

export class FirstPersonCamera extends Camera {
  private mouseSensitivity: number;

  constructor(position: vec3, orientation: quat, mouseSensitivity: number = 0.2) {
    super(position, orientation);
    this.mouseSensitivity = mouseSensitivity;
  }

  moveForward(amount: number): void {
    const forwardDirection = vec3.transformQuat(vec3.create(), vec3.fromValues(0, 0, -1), this.orientation);
    vec3.scaleAndAdd(this.position, this.position, forwardDirection, -amount);
  }

  moveBackward(amount: number): void {
    const backwardDirection = vec3.transformQuat(vec3.create(), vec3.fromValues(0, 0, 1), this.orientation);
    vec3.scaleAndAdd(this.position, this.position, backwardDirection, -amount);
  }

  moveLeft(amount: number): void {
    const right = vec3.transformQuat(vec3.create(), vec3.fromValues(1, 0, 0), this.orientation);
    vec3.scaleAndAdd(this.position, this.position, right, amount);
  }

  moveRight(amount: number): void {
    const right = vec3.transformQuat(vec3.create(), vec3.fromValues(1, 0, 0), this.orientation);
    vec3.scaleAndAdd(this.position, this.position, right, -amount);
  }

  rotate(pitch: number, yaw: number): void {
    const pitchQuat = quat.setAxisAngle(quat.create(), [1, 0, 0], pitch * this.mouseSensitivity);
    const yawQuat = quat.setAxisAngle(quat.create(), [0, 1, 0], yaw * this.mouseSensitivity);

    quat.multiply(this.orientation, this.orientation, pitchQuat);
    quat.multiply(this.orientation, yawQuat, this.orientation);

    quat.normalize(this.orientation, this.orientation);
  }
}