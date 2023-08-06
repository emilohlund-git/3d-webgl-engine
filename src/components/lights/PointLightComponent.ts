import { vec3 } from "gl-matrix";
import { LightComponent, LightType } from "./LightComponent";

export class PointLightComponent extends LightComponent {
  position: vec3; // The position of the point light
  range: number;  // The range of the point light

  constructor(color: vec3, intensity: number, position: vec3, range: number) {
    super(color, intensity, LightType.Point);
    this.position = position;
    this.range = range;
  }
}