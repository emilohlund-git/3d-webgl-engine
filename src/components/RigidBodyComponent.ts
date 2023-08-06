import { quat, vec3 } from "gl-matrix";
import { Component } from "./Component";

export class RigidBodyComponent extends Component {
  mass: number;
  velocity: vec3;
  acceleration: vec3;
  angularVelocity: vec3;
  angularAcceleration: vec3;
  orientation: quat;
  angularDamping: number;
  restitution: number;
  friction: number;
  isStatic: boolean;

  constructor(mass: number, isStatic: boolean = false) {
    super("RigidBodyComponent");

    this.mass = mass;
    this.velocity = vec3.create();
    this.acceleration = vec3.create();
    this.angularVelocity = vec3.create();
    this.angularAcceleration = vec3.create();
    this.orientation = quat.create();
    this.angularDamping = 0.1; // Damping to slow down rotational motion
    this.restitution = 0.5; // Coefficient of restitution (bounce)
    this.friction = 0.5; // Coefficient of friction
    this.isStatic = isStatic; // Whether the rigid body is immovable
  }
}