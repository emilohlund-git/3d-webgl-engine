import { vec3 } from "gl-matrix";
import { ShaderProgram } from "../ShaderProgram";
import { Component } from "./Component";

export class RenderComponent extends Component {
  constructor(
    public vertices: number[],
    public indices: number[],
    public normals: vec3[],
    readonly shaderProgram: ShaderProgram,
  ) {
    super("RenderComponent");
  }
}