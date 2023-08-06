import { mat4 } from "gl-matrix";
import { WebGLCanvas } from "../WebGLCanvas";
import { BufferManager } from "../buffers/BufferManager";
import { FirstPersonCamera } from "../cameras/FirstPersonCamera";
import { config } from "../config";
import { CameraSystem } from "./CameraSystem";
import { CollisionSystem } from "./CollisionSystem";
import { LightingSystem } from "./LightingSystem";
import { RenderSystem } from "./RenderSystem";
import { System } from "./System";
import { TransformSystem } from "./TransformSystem";

export class SystemInitializer {
  static initializeSystems(window: WebGLCanvas, bufferManager: BufferManager, cameraSpeed: number, mouseSensitivity: number): System[] {
    const camera = new FirstPersonCamera(config.cameraPosition, config.cameraRotation, mouseSensitivity);
    const projectionMatrix = mat4.create();

    const renderSystem = new RenderSystem(window, bufferManager, camera, projectionMatrix);
    const transformSystem = new TransformSystem();
    const cameraSystem = new CameraSystem(projectionMatrix, window, camera, cameraSpeed);
    const lightingSystem = new LightingSystem();
    const collisionSystem = new CollisionSystem();

    return [cameraSystem, transformSystem, lightingSystem, renderSystem, collisionSystem];
  }
}