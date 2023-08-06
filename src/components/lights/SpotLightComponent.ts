import { vec3 } from "gl-matrix";
import { LightComponent, LightType } from "./LightComponent";

export class SpotLightComponent extends LightComponent {
  position: vec3;        // The position of the spot light
  direction: vec3;       // The direction of the spot light rays
  angle: number;         // The angle of the cone of light
  innerConeAngle: number; // The inner cone angle
  outerConeAngle: number; // The outer cone angle
  cutoffAngle: number;

  constructor(color: vec3, intensity: number, position: vec3, direction: vec3, angle: number, innerConeAngle: number, outerConeAngle: number, cutoffAngle: number) {
    super(color, intensity, LightType.Spot);
    this.position = position;
    this.direction = direction;
    this.angle = angle;
    this.innerConeAngle = innerConeAngle;
    this.outerConeAngle = outerConeAngle;
    this.cutoffAngle = cutoffAngle;
  }
}