import { vec3 } from "gl-matrix";
import { EntityBuilder } from "./EntityBuilder";

export async function createTerrainEntity(webGLContext: WebGL2RenderingContext) {
  const terrain = await new EntityBuilder(webGLContext)
    .setIsTerrain()
    .setFragmentShader("./shaders/frag-shader.frag")
    .setVertexShader("./shaders/vert-shader.vert")
    .setGridSize({
      rows: 200,
      cols: 200
    })
    .setTextureSrc("./assets/textures/rocky_trail_disp_4k.png")
    .setMaterialProperties({
      color: vec3.fromValues(0.6, 0.4, 0.2),
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
    .setPosition(vec3.fromValues(0.0, -10.0, 0.0))
    .build();

  return terrain;
}