import { vec3 } from "gl-matrix";
import { Entity } from "./Entity";
import { EntityBuilder } from "./EntityBuilder";

export async function createSkybox(webGLContext: WebGL2RenderingContext): Promise<Entity> {
  const skybox = new EntityBuilder(webGLContext)
    .setIsSkybox()
    .setFragmentShader("./shaders/skybox-frag-shader.frag")
    .setVertexShader("./shaders/skybox-vert-shader.vert")
    .setMeshSize(1000)
    .setTextureSrcList([
      "./assets/skybox/yellow/yellow_rt.jpg",
      "./assets/skybox/yellow/yellow_lf.jpg",
      "./assets/skybox/yellow/yellow_up.jpg",
      "./assets/skybox/yellow/yellow_dn.jpg",
      "./assets/skybox/yellow/yellow_bk.jpg",
      "./assets/skybox/yellow/yellow_ft.jpg",
    ])
    .setMaterialProperties({
      color: vec3.fromValues(1.0, 1.0, 1.0),
      shinyness: 0.8,
      transparency: 1
    })
    .build();

  return skybox;
}