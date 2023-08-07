import { Camera } from "../cameras/Camera";
import { Entity } from "../entities/Entity";
import { System } from "./System";

export class PlayerSystem extends System {
  constructor(playerEntity: Entity, camera: Camera) {
    super();
  }

  async preload() { }

  update(deltaTime: number) {

  }

  render() { }
}