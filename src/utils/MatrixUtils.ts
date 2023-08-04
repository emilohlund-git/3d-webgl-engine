import { mat4, vec3 } from "gl-matrix";
import { WebGLCanvas } from "../WebGLCanvas";

export class MatrixUtils {
  static createProjectionMatrix(canvas: WebGLCanvas) {
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, 45, canvas.width / canvas.height, 0.1, 100);
    return projectionMatrix;
  }

  static createViewMatrix() {
    const viewMatrix = mat4.create();
    viewMatrix[14] = viewMatrix[14] - 6;
    return viewMatrix;
  }

  static createModelMatrix(position: vec3, rotation: vec3) {
    const modelMatrix = mat4.create();
    mat4.translate(modelMatrix, modelMatrix, position);
    mat4.rotateX(modelMatrix, modelMatrix, rotation[0]);
    mat4.rotateY(modelMatrix, modelMatrix, rotation[1]);
    mat4.rotateZ(modelMatrix, modelMatrix, rotation[2]);
    return modelMatrix;
  }
}
