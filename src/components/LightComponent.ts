import { vec3 } from 'gl-matrix'; // Or any other library for vector math
import { Component } from './Component';

export class LightComponent extends Component {
  color: vec3;
  intensity: number;
  direction: vec3;
  combinedLightColor: vec3;

  constructor(color: vec3 = vec3.fromValues(1.0, 1.0, 1.0), intensity: number = 1.0, direction: vec3 = vec3.create(), combinedLightcolor: vec3 = vec3.fromValues(0.3, 0.3, 0.3)) {
    super("LightComponent");
    this.color = color;
    this.intensity = intensity;
    this.direction = direction;
    this.combinedLightColor = combinedLightcolor;
  }
}