import { quat, vec3 } from "gl-matrix";

export const config = {
  canvasWidth: 1600,
  canvasHeight: 900,
  cameraPosition: vec3.fromValues(0, -10, -8.0),
  cameraRotation: quat.create(),
  cameraSpeed: 0.05,
  mouseSensitivity: 2,
};