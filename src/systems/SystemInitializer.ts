import { mat4 } from "gl-matrix";
import { WebGLCanvas } from "../WebGLCanvas";
import { BufferManager } from "../buffers/BufferManager";
import { FirstPersonCamera } from "../cameras/FirstPersonCamera";
import { config } from "../config";
import { Entity } from "../entities/Entity";
import { CameraSystem } from "./CameraSystem";
import { CollisionSystem } from "./CollisionSystem";
import { LightingSystem } from "./LightingSystem";
import { PhysicsSystem } from "./PhysicsSystem";
import { PlayerSystem } from "./PlayerSystem";
import { RenderSystem } from "./RenderSystem";
import { System } from "./System";
import { TransformSystem } from "./TransformSystem";

export class SystemInitializer {
  static initializeSystems(window: WebGLCanvas, playerEntity: Entity, bufferManager: BufferManager, cameraSpeed: number, mouseSensitivity: number): System[] {
    const camera = new FirstPersonCamera(config.cameraPosition, config.cameraRotation, mouseSensitivity);
    const projectionMatrix = mat4.create();

    const playerSystem = new PlayerSystem(playerEntity, camera);
    const renderSystem = new RenderSystem(window, bufferManager, camera, projectionMatrix);
    const transformSystem = new TransformSystem();
    const cameraSystem = new CameraSystem(projectionMatrix, window, camera, cameraSpeed);
    const lightingSystem = new LightingSystem();
    const collisionSystem = new CollisionSystem();
    const physicsSystem = new PhysicsSystem();

    return [cameraSystem, lightingSystem, physicsSystem, collisionSystem, transformSystem, playerSystem, renderSystem];
  }
}