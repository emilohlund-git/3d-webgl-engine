import { vec3 } from "gl-matrix";
import { Component } from "./Component";

export class MaterialComponent extends Component {
  color: vec3;         // Surface color in RGB (e.g., [1.0, 0.0, 0.0] for red)
  texture?: WebGLTexture; // Texture to be applied to the surface (optional)
  shininess: number;   // Shininess of the material (used for specular highlights)
  transparency: number; // Transparency of the material (0.0: fully opaque, 1.0: fully transparent)

  constructor(color: vec3, shininess: number = 32, transparency: number = 0.0) {
    super("MaterialComponent");

    this.color = color;
    this.shininess = shininess;
    this.transparency = transparency;
  }
}