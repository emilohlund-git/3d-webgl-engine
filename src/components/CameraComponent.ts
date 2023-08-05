import { quat, vec3 } from "gl-matrix";
import { Component } from "./Component";

export class CameraComponent extends Component {
  public position: vec3;
  public rotation: quat;
  public fov: number;
  public aspectRatio: number;
  public nearClip: number;
  public farClip: number;

  constructor(
    position: vec3 = vec3.fromValues(0, 0, -5),
    rotation: quat = quat.create(),
    fov: number = 45,
    aspectRatio: number = 0.1,
    nearClip: number = 0.1,
    farClip: number = 100
  ) {
    super("CameraComponent");

    this.position = position;
    this.rotation = rotation;
    this.fov = fov;
    this.aspectRatio = aspectRatio;
    this.nearClip = nearClip;
    this.farClip = farClip;
  }
}