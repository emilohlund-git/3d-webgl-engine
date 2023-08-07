import { vec3 } from "gl-matrix";
import { Entity } from "./Entity";
import { EntityBuilder } from "./EntityBuilder";

export async function createSkybox(webGLContext: WebGL2RenderingContext): Promise<Entity> {
  const skybox = new EntityBuilder(webGLContext)
    .setIsSkybox()
    .setFragmentShader("./shaders/skybox-frag-shader.frag")
    .setVertexShader("./shaders/skybox-vert-shader.vert")
    .setMeshSize(10000)
    .setTextureSrcList([
      "./assets/skybox/daylight/Daylight Box_Left.bmp",
      "./assets/skybox/daylight/Daylight Box_Right.bmp",
      "./assets/skybox/daylight/Daylight Box_Top.png",
      "./assets/skybox/daylight/Daylight Box_Bottom.bmp",
      "./assets/skybox/daylight/Daylight Box_Back.bmp",
      "./assets/skybox/daylight/Daylight Box_Front.bmp",
    ])
    .setMaterialProperties({
      color: vec3.fromValues(1.0, 1.0, 1.0),
      shinyness: 0.8,
      transparency: 1
    })
    .build();

  return skybox;
}