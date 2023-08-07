import { vec3 } from "gl-matrix";
import { EntityBuilder } from "./EntityBuilder";

export async function createTerrainEntity(webGLContext: WebGL2RenderingContext) {
  const terrain = await new EntityBuilder(webGLContext)
    .setIsTerrain()
    .setIsRigidBody()
    .setPhysicsProperties({
      isStatic: true,
      mass: 0
    })
    .setFragmentShader("./shaders/terrain-frag-shader.frag")
    .setVertexShader("./shaders/terrain-vert-shader.vert")
    .setGridSize({
      rows: 100,
      cols: 100
    })
    .setCollisionSize(vec3.fromValues(100, 1, 100))
    .setTextureSrc("./assets/prototype/dark/texture_02.png")
    .setMaterialProperties({
      color: vec3.fromValues(0.15, 0.15, 0.15),
      shinyness: 0.8,
      transparency: 1
    })
    .setPosition(vec3.fromValues(-50.0, 0.0, -50.0))
    .build();

  return terrain;
}