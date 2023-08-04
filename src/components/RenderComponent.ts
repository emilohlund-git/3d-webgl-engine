import { mat4, vec3 } from "gl-matrix";
import { ShaderProgram } from "../ShaderProgram";
import { Component } from "./Component";

export class RenderComponent extends Component {
  constructor(
    public vertices: number[],
    public indices: number[],
    public colors: number[],
    public position: vec3,
    readonly shaderProgram: ShaderProgram,
    public moveMatrix: mat4 = mat4.create(),
  ) {
    super("RenderComponent");
  }
}