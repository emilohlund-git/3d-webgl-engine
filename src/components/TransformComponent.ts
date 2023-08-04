import { mat4, vec3 } from "gl-matrix";
import { Component } from "./Component";

export class TransformComponent extends Component {
  public position: vec3;
  public rotation: vec3;
  public scale: vec3;
  private modelMatrix = mat4.create();

  constructor(position: vec3 = vec3.create(), rotation: vec3 = vec3.create(), scale: vec3 = vec3.fromValues(1, 1, 1)) {
    super("TransformComponent");

    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }

  getModelMatrix(): mat4 {
    mat4.translate(this.modelMatrix, this.modelMatrix, this.position);
    mat4.rotateX(this.modelMatrix, this.modelMatrix, this.rotation[0]);
    mat4.rotateY(this.modelMatrix, this.modelMatrix, this.rotation[1]);
    mat4.rotateZ(this.modelMatrix, this.modelMatrix, this.rotation[2]);
    mat4.scale(this.modelMatrix, this.modelMatrix, this.scale);

    return this.modelMatrix;
  }
}