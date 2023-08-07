import { Entity } from "./Entity";

export type ComponentName = "RenderComponent" | "TerrainComponent" | "TransformComponent" |
  "LightComponent" | "MaterialComponent" | "CollisionComponent" | "RigidBodyComponent" | "SkyboxComponent" |
  "MeshComponent";

export class EntityManager {
  private entities = <Entity[]>[];

  public getEntities(): Entity[] {
    return this.entities;
  }

  public addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  public addEntities(entities: Entity[]) {
    this.entities.push(...entities);
  }

  public getEntityById(id: string): Entity | undefined {
    return this.entities.find((e) => e.id === id);
  }

  public getEntitiesByComponent(componentName: ComponentName): Entity[] {
    return this.entities.filter((value) => value.getComponent(componentName) !== undefined);
  }

  public getEntitiesByComponents(components: ComponentName[]): Entity[] {
    const uniqueEntities: Set<Entity> = new Set();

    this.entities.forEach((entity) => {
      if (components.some((c) => entity.getComponent(c) !== undefined)) {
        uniqueEntities.add(entity);
      }
    });

    return Array.from(uniqueEntities);
  }

  public removeEntity(entity: Entity) {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }
}