import { vec3 } from "gl-matrix";
import { ShaderProgram } from "../ShaderProgram";
import { MaterialComponent } from "../components/MaterialComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { SpotLightComponent } from "../components/lights/SpotLightComponent";
import { MeshUtils } from "../utils/MeshUtils";
import { TextureUtils } from "../utils/TextureUtils";
import { Entity } from "./Entity";

export async function createTerrainEntity(webGLContext: WebGL2RenderingContext) {
  const terrain = new Entity();

  const shaderProgram = new ShaderProgram(webGLContext);
  await shaderProgram.initializeShaders("./shaders/vert-shader.vert", "./shaders/frag-shader.frag");

  const { vertices, indices, normals, uvs } = MeshUtils.generateGridMesh(200, 200);

  const textureSrc = "./assets/textures/rocky_trail_disp_4k.png";
  const texture = await TextureUtils.loadTexture(webGLContext, textureSrc);
  const materialComponent = new MaterialComponent(
    vec3.fromValues(0.6, 0.4, 0.2),
    0.8,
    .5,
    texture
  )

  const renderComponent = new RenderComponent(
    vertices,
    indices,
    normals,
    uvs,
    shaderProgram
  );

  terrain.addComponent("RenderComponent", renderComponent);
  terrain.addComponent("MaterialComponent", materialComponent);
  terrain.addComponent("LightComponent", new SpotLightComponent(
    vec3.fromValues(1.0, 1.0, 1.0),
    1,
    vec3.fromValues(0.0, -10.0, 1.0),
    vec3.fromValues(0.0, 1.0, 0.0),
    1,
    10,
    10,
    123
  ));
  terrain.addComponent("TransformComponent", new TransformComponent(vec3.fromValues(0, -10, 0)));

  return terrain;
}