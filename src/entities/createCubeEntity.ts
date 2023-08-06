import { vec3 } from "gl-matrix";
import { ShaderProgram } from "../ShaderProgram";
import { MaterialComponent } from "../components/MaterialComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { SpotLightComponent } from "../components/lights/SpotLightComponent";
import { MeshUtils } from "../utils/MeshUtils";
import { TextureUtils } from "../utils/TextureUtils";
import { Entity } from "./Entity";

export async function createCubeEntity(webGLContext: WebGL2RenderingContext): Promise<Entity> {
  const cube = new Entity();

  const shaderProgram = new ShaderProgram(webGLContext);
  await shaderProgram.initializeShaders("./shaders/vert-shader.vert", "./shaders/frag-shader.frag");

  const { vertices, indices, normals, uvs } = MeshUtils.generateCubeMesh(20);

  const renderComponent = new RenderComponent(
    vertices,
    indices,
    normals,
    uvs,
    shaderProgram
  );

  const textureSrc = "./assets/textures/short_bricks_floor_disp_1k.png";
  const texture = await TextureUtils.loadTexture(webGLContext, textureSrc);
  const materialComponent = new MaterialComponent(
    vec3.fromValues(1.0, 1.0, 1.0),
    0.8,
    1,
    texture
  )

  cube.addComponent("RenderComponent", renderComponent);
  cube.addComponent("LightComponent", new SpotLightComponent(
    vec3.fromValues(1.0, 1.0, 1.0),
    1,
    vec3.fromValues(-1.0, -1.0, -1.0),
    vec3.fromValues(1.0, 1.0, 1.0),
    121,
    0.8,
    0.8,
    141
  ));
  cube.addComponent("MaterialComponent", materialComponent);
  cube.addComponent("TransformComponent", new TransformComponent(vec3.fromValues(0, 3, 0)));

  return cube;
}