import { vec3 } from "gl-matrix";
import { ShaderProgram } from "../ShaderProgram";
import { CollisionComponent } from "../components/CollisionComponent";
import { MaterialComponent } from "../components/MaterialComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { TransformComponent } from "../components/TransformComponent";
import { SpotLightComponent } from "../components/lights/SpotLightComponent";
import { RenderComponent } from "../components/rendering/RenderComponent";
import { SkyboxComponent } from "../components/rendering/SkyboxComponent";
import { TerrainComponent } from "../components/rendering/TerrainComponent";
import { Mesh, MeshUtils } from "../utils/MeshUtils";
import { TerrainUtils } from "../utils/TerrainUtils";
import { TextureUtils } from "../utils/TextureUtils";
import { Entity } from "./Entity";

export class EntityBuilder {
  private webGLContext: WebGL2RenderingContext;
  private isSkybox: boolean = false;
  private isTerrain: boolean = false;
  private heightMap: number[][] | undefined;
  private isRigidBody: boolean = false;
  private meshSize: number = 1;
  private gridSize: {
    rows: number;
    cols: number;
  } = {
      rows: 200,
      cols: 200,
    };
  private textureSrc?: string;
  private textureSrcList?: string[];
  private lightProperties: {
    color: vec3;
    intensity: number;
    position: vec3;
    direction: vec3;
    angle: number;
    innerConeAngle: number;
    outerConeAngle: number;
    cutoffAngle: number;
  } = {
      color: vec3.fromValues(1.0, 1.0, 1.0),
      intensity: 1.0,
      position: vec3.create(),
      direction: vec3.create(),
      angle: 10,
      innerConeAngle: 10,
      outerConeAngle: 5,
      cutoffAngle: 10,
    };
  private vertexShaderSource?: string;
  private fragmentShaderSource?: string;
  private materialProperties: {
    color: vec3;
    shinyness: number;
    transparency: number;
  } = {
      color: vec3.fromValues(1.0, 1.0, 1.0),
      shinyness: 0.8,
      transparency: 1.0,
    };
  private position: vec3 = vec3.create();
  private collisionSize: vec3 = vec3.create();
  private physicsProperties: {
    mass: number;
    isStatic: boolean;
  } = {
      mass: 5,
      isStatic: false, // Whether the rigid body is immovable
    }

  constructor(webGLContext: WebGL2RenderingContext) {
    this.webGLContext = webGLContext;
  }

  setMeshSize(size: number): this {
    this.meshSize = size;
    return this;
  }

  setHeightMap(width: number, height: number, frequency: number, amplitude: number, octaves: number) {
    this.heightMap = TerrainUtils.generateHeightMap(width, height, frequency, amplitude, octaves);
  }

  setPhysicsProperties(physicsProperties: {
    mass: number;
    isStatic: boolean;
  }): this {
    this.physicsProperties = { ...this.physicsProperties, ...physicsProperties };
    return this;
  }

  setTextureSrc(src: string): this {
    if (this.isSkybox) throw new Error("Assign 6 textures for a skybox.");
    this.textureSrc = src;
    return this;
  }

  setTextureSrcList(srcList: string[]): this {
    if (!this.isSkybox) throw new Error("Only one texture if not skybox.");
    this.textureSrcList = srcList;
    return this;
  }

  setLightProperties(lightProperties: {
    color: vec3;
    intensity: number;
    position: vec3;
    direction: vec3;
    angle: number;
    innerConeAngle: number;
    outerConeAngle: number;
    cutoffAngle: number;
  }): this {
    this.lightProperties = { ...this.lightProperties, ...lightProperties };
    return this;
  }

  setCollisionSize(size: vec3): this {
    this.collisionSize = size;
    return this;
  }

  setIsTerrain(): this {
    this.isTerrain = true;
    return this;
  }

  setIsSkybox(): this {
    this.isSkybox = true;
    return this;
  }

  setIsRigidBody(): this {
    this.isRigidBody = true;
    return this;
  }

  setVertexShader(vertexShaderSource: string): this {
    this.vertexShaderSource = vertexShaderSource;
    return this;
  }

  setFragmentShader(fragmentShaderSource: string): this {
    this.fragmentShaderSource = fragmentShaderSource;
    return this;
  }

  setMaterialProperties(materialProperties: {
    color: vec3,
    shinyness: number,
    transparency: number,
  }): this {
    this.materialProperties = { ...this.materialProperties, ...materialProperties };
    return this;
  }

  setGridSize(gridSize: {
    rows: number;
    cols: number;
  }): this {
    this.gridSize = gridSize;
    return this;
  }

  setPosition(position: vec3): this {
    this.position = position;
    return this;
  }

  async build(): Promise<Entity> {
    const entity = new Entity();

    if (!this.vertexShaderSource || !this.fragmentShaderSource) {
      throw new Error("Assign a vertex and a fragment shader to Entity.");
    }

    const shaderProgram = new ShaderProgram(this.webGLContext);
    await shaderProgram.initializeShaders(this.vertexShaderSource, this.fragmentShaderSource);

    const meshData = this.generateMesh();
    if (!meshData.vertices || !meshData.indices || !meshData.normals) {
      throw new Error("Failed to generate mesh.");
    }

    const texture = await this.loadTexture();

    const materialComponent = this.createMaterialComponent(texture);
    const renderComponent = this.createRenderComponent(meshData, shaderProgram);

    if (!this.isSkybox) {
      const lightComponent = this.createSpotLightComponent();
      const transformComponent = this.createTransformComponent();
      entity.addComponent("TransformComponent", transformComponent);
      entity.addComponent("LightComponent", lightComponent);
    } else {
      entity.addComponent("SkyboxComponent", new SkyboxComponent());
    }

    if (this.isRigidBody) {
      const rigidBodyComponent = this.createRigidBodyComponent(this.physicsProperties);
      entity.addComponent("RigidBodyComponent", rigidBodyComponent);
      entity.addComponent("CollisionComponent", new CollisionComponent(this.collisionSize));
    }

    if (this.isTerrain) {
      const terrainComponent = new TerrainComponent();
      entity.addComponent("TerrainComponent", terrainComponent);
    }

    entity.addComponent("RenderComponent", renderComponent);
    entity.addComponent("MaterialComponent", materialComponent);

    return entity;
  }

  private async loadTexture(): Promise<WebGLTexture> {
    if (this.isSkybox && this.textureSrcList) {
      return await TextureUtils.loadCubeMapTexture(this.webGLContext, this.textureSrcList);
    } else if (!this.isSkybox && this.textureSrc) {
      return await TextureUtils.loadTexture(this.webGLContext, this.textureSrc);
    } else {
      throw new Error("Failed to load texture.");
    }
  }

  private generateMesh(): Mesh {
    if (this.isTerrain) {
      return MeshUtils.generateGridMesh(this.gridSize.rows, this.gridSize.cols, this.heightMap);
    } else {
      return MeshUtils.generateCubeMesh(this.meshSize);
    }
  }

  private createSpotLightComponent(): SpotLightComponent {
    return new SpotLightComponent(
      this.lightProperties.color,
      this.lightProperties.intensity,
      this.lightProperties.position,
      this.lightProperties.direction,
      this.lightProperties.angle,
      this.lightProperties.innerConeAngle,
      this.lightProperties.outerConeAngle,
      this.lightProperties.cutoffAngle,
    );
  }

  private createTransformComponent(): TransformComponent {
    return new TransformComponent(this.position);
  }

  private createRenderComponent(meshData: Mesh, shaderProgram: ShaderProgram): RenderComponent {
    return new RenderComponent(meshData.vertices, meshData.indices, meshData.normals, meshData.uvs, shaderProgram);
  }

  private createMaterialComponent(texture: WebGLTexture): MaterialComponent {
    return new MaterialComponent(
      this.materialProperties.color,
      this.materialProperties.shinyness,
      this.materialProperties.transparency,
      texture
    );
  }

  private createRigidBodyComponent(physicsProperties: {
    mass: number;
    isStatic: boolean;
  }) {
    return new RigidBodyComponent(
      physicsProperties.mass,
      physicsProperties.isStatic
    );
  }
}