import { vec3 } from "gl-matrix";
import { ShaderProgram } from "../ShaderProgram";
import { MaterialComponent } from "../components/MaterialComponent";
import { RenderComponent } from "../components/RenderComponent";
import { SkyboxComponent } from "../components/SkyboxComponent";
import { MeshUtils } from "../utils/MeshUtils";
import { TextureUtils } from "../utils/TextureUtils";
import { Entity } from "./Entity";

export async function createSkybox(webGLContext: WebGL2RenderingContext): Promise<Entity> {
  const skybox = new Entity();

  const shaderProgram = new ShaderProgram(webGLContext);
  await shaderProgram.initializeShaders("./shaders/skybox-vert-shader.vert", "./shaders/skybox-frag-shader.frag");

  const { vertices, indices, normals, uvs } = MeshUtils.generateCubeMesh(1000);

  const renderComponent = new RenderComponent(vertices, indices, normals, uvs, shaderProgram);

  const textureSrcList = [
    "./assets/skybox/miramar_rt.png",
    "./assets/skybox/miramar_lf.png",
    "./assets/skybox/miramar_up.png",
    "./assets/skybox/miramar_dn.png",
    "./assets/skybox/miramar_bk.png",
    "./assets/skybox/miramar_ft.png",
  ];
  const texture = await TextureUtils.loadCubeMapTexture(webGLContext, textureSrcList);
  const materialComponent = new MaterialComponent(
    vec3.fromValues(1.0, 1.0, 1.0),
    0.8,
    1,
    texture
  )

  skybox.addComponent("SkyboxComponent", new SkyboxComponent());
  skybox.addComponent("RenderComponent", renderComponent);
  skybox.addComponent("MaterialComponent", materialComponent);

  return skybox;
}