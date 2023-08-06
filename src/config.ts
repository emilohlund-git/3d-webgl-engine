import { quat, vec3 } from "gl-matrix";

export const config = {
  canvasWidth: 1600,
  canvasHeight: 900,
  cameraPosition: vec3.fromValues(0, 0, -5),
  cameraRotation: quat.create(),
  cameraSpeed: 2,
  mouseSensitivity: 2,
};