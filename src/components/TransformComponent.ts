import { mat4, quat, vec3 } from "gl-matrix";
import { Component } from "./Component";

export class TransformComponent extends Component {
  public position: vec3;
  public rotation: quat;
  public scale: vec3;
  public modelMatrix = mat4.create();

  constructor(position: vec3 = vec3.create(), rotation: quat = quat.create(), scale: vec3 = vec3.fromValues(1, 1, 1)) {
    super("TransformComponent");

    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }

  moveForward(distance: number) {
    const forward = vec3.fromValues(0, 0, 1);
    vec3.transformQuat(forward, forward, this.rotation);
    vec3.scaleAndAdd(this.position, this.position, forward, distance);
  }

  moveBackward(distance: number) {
    const backward = vec3.fromValues(0, 0, -1);
    vec3.transformQuat(backward, backward, this.rotation);
    vec3.scaleAndAdd(this.position, this.position, backward, distance);
  }

  moveLeft(distance: number) {
    const left = vec3.fromValues(1, 0, 0);
    vec3.transformQuat(left, left, this.rotation);
    vec3.scaleAndAdd(this.position, this.position, left, distance);
  }

  moveRight(distance: number) {
    const right = vec3.fromValues(-1, 0, 0);
    vec3.transformQuat(right, right, this.rotation);
    vec3.scaleAndAdd(this.position, this.position, right, distance);
  }

  rotateX(angle: number) {
    quat.rotateX(this.rotation, this.rotation, angle);
  }

  rotateY(angle: number) {
    quat.rotateY(this.rotation, this.rotation, angle);
  }

  rotateZ(angle: number) {
    quat.rotateZ(this.rotation, this.rotation, angle);
  }

  public getRotationQuat(): quat {
    const quatX = quat.create();
    const quatY = quat.create();
    const quatZ = quat.create();
    quat.setAxisAngle(quatX, [1, 0, 0], this.rotation[0]);
    quat.setAxisAngle(quatY, [0, 1, 0], this.rotation[1]);
    quat.setAxisAngle(quatZ, [0, 0, 1], this.rotation[2]);

    // Create a new quaternion to store the result of multiplication
    const resultQuat = quat.create();

    // Multiply the quaternions in sequence
    quat.multiply(resultQuat, quatY, quatX);
    quat.multiply(resultQuat, quatZ, resultQuat);

    return resultQuat;
  }
}