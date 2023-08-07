import { vec3 } from "gl-matrix";
import { Entity } from "./Entity";
import { EntityBuilder } from "./EntityBuilder";

export async function createCubeEntity(webGLContext: WebGL2RenderingContext): Promise<Entity> {
  const cube = await new EntityBuilder(webGLContext)
    .setIsRigidBody()
    .setFragmentShader("./shaders/frag-shader.frag")
    .setVertexShader("./shaders/vert-shader.vert")
    .setMeshSize(2)
    .setPhysicsProperties({
      isStatic: false,
      mass: 0.2
    })
    .setCollisionSize(vec3.fromValues(2, 2, 2))
    .setTextureSrc("./assets/prototype/Orange/texture_01.png")
    .setMaterialProperties({
      color: vec3.fromValues(1.0, 1.0, 1.0),
      shinyness: 0.8,
      transparency: 1
    })
    .setLightProperties({
      color: vec3.fromValues(1.0, 1.0, 1.0),
      intensity: 0.1,
      position: vec3.fromValues(0.0, -10.0, 0.0),
      direction: vec3.fromValues(0.0, 1.0, 0.0),
      angle: 360,
      innerConeAngle: 360,
      outerConeAngle: 360,
      cutoffAngle: 360
    })
    .setPosition(vec3.fromValues(0.0, 20.0, 0.0))
    .build();

  return cube;
}