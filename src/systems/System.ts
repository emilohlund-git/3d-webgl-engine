import { EntityManager } from "../entities/EntityManager";

export abstract class System {
  abstract preload(entityManager: EntityManager): Promise<void>;
  abstract update(deltaTime: number, entityManager: EntityManager): void;
  abstract render(entityManager: EntityManager): void;
}