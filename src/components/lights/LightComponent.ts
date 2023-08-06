import { vec3 } from 'gl-matrix'; // Or any other library for vector math
import { Component } from '../Component';

export enum LightType {
  Point = "point",
  Directional = "directional",
  Spot = "spot"
}

export class LightComponent extends Component {
  color: vec3;        // The color of the light
  intensity: number;  // The intensity/brightness of the light
  direction: vec3 = vec3.create();
  combinedLightColor: vec3 = vec3.create();
  type: LightType;       // Type identifier for the light (e.g., "point", "directional", "spot")

  constructor(color: vec3, intensity: number, type: LightType) {
    super("LightComponent");

    this.color = color;
    this.intensity = intensity;
    this.type = type;
  }
}