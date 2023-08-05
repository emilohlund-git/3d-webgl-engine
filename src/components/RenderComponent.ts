import { ShaderProgram } from "../ShaderProgram";
import { Component } from "./Component";

export class RenderComponent extends Component {
  constructor(
    public vertices: number[],
    public indices: number[],
    public colors: number[],
    readonly shaderProgram: ShaderProgram,
  ) {
    super("RenderComponent");
  }
}