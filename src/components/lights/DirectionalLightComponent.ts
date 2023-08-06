import { vec3 } from "gl-matrix";
import { LightComponent, LightType } from "./LightComponent";

export class DirectionalLightComponent extends LightComponent {
  direction: vec3; // The direction of the directional light

  constructor(color: vec3, intensity: number, direction: vec3) {
    super(color, intensity, LightType.Directional);
    this.direction = direction;
  }
}