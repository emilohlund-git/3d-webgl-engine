import { quat, vec3 } from "gl-matrix";
import { Camera } from "./Camera";

export class OrbitCamera extends Camera {
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
    // Apply pitch rotation around the camera's local right axis (vertical axis)
    const right = vec3.transformQuat(vec3.create(), vec3.fromValues(1, 0, 0), this.orientation);
    const pitchQuat = quat.setAxisAngle(quat.create(), right, pitch);

    // Apply yaw rotation around the world up axis (vertical axis)
    const worldUp = vec3.fromValues(0, 1, 0);
    const yawQuat = quat.setAxisAngle(quat.create(), worldUp, yaw);

    // Combine the pitch and yaw rotations
    quat.multiply(this.orientation, pitchQuat, this.orientation);
    quat.multiply(this.orientation, this.orientation, yawQuat);

    // Normalize the orientation quaternion
    quat.normalize(this.orientation, this.orientation);
  }
}