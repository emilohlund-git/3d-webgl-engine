import { vec3 } from "gl-matrix";
import { Component } from "./Component";

export class CollisionComponent extends Component {
  size: vec3;
  center: vec3;

  constructor(size: vec3) {
    super("CollisionComponent");

    this.size = size;
    this.center = vec3.create();
  }
}