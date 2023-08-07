import { vec3 } from "gl-matrix";
import { Entity } from "./Entity";
import { EntityBuilder } from "./EntityBuilder";

export async function createCubeEntity(webGLContext: WebGL2RenderingContext): Promise<Entity> {
  const cube = await new EntityBuilder(webGLContext)
    .setFragmentShader("./shaders/frag-shader.frag")
    .setVertexShader("./shaders/vert-shader.vert")
    .setMeshSize(10)
    .setPhysicsProperties({
      isStatic: false,
      mass: 1
    })
    .setTextureSrc("./assets/textures/short_bricks_floor_disp_1k.png")
    .setMaterialProperties({
      color: vec3.fromValues(1.0, 1.0, 1.0),
      shinyness: 0.8,
      transparency: 1
    })
    .setLightProperties({
      color: vec3.fromValues(1.0, 1.0, 1.0),
      intensity: 1,
      position: vec3.fromValues(-1.0, -1.0, -1.0),
      direction: vec3.fromValues(1.0, 1.0, 1.0),
      angle: 121,
      innerConeAngle: 0.8,
      outerConeAngle: 0.8,
      cutoffAngle: 141
    })
    .setPosition(vec3.fromValues(0.0, 3.0, 0.0))
    .build();

  return cube;
}