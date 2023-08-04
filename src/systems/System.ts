import { EntityManager } from "../entities/EntityManager";

export abstract class System {
  abstract preload(): void;
  abstract update(deltaTime: number, entityManager: EntityManager): void;
  abstract render(): void;
}