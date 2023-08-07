import { vec3 } from "gl-matrix";
import { Entity } from "./Entity";
import { EntityBuilder } from "./EntityBuilder";

export async function createCubeEntity(webGLContext: WebGL2RenderingContext, position: vec3): Promise<Entity> {
  const size = 1;
  const mass = size;
  const cube = await new EntityBuilder(webGLContext)
    .setIsRigidBody()
    .setFragmentShader("./shaders/frag-shader.frag")
    .setVertexShader("./shaders/vert-shader.vert")
    .setMeshSize(size)
    .setPhysicsProperties({
      isStatic: false,
      mass
    })
    .setCollisionSize(vec3.fromValues(size, size, size))
    .setTextureSrc("./assets/prototype/Orange/texture_01.png")
    .setMaterialProperties({
      color: vec3.fromValues(0.15, 0.15, 0.15),
      shinyness: 0.8,
      transparency: 1
    })
    .setPosition(position)
    .build();

  return cube;
}