import { EntityManager } from "./entities/EntityManager";
import { System } from "./systems/System";

export class Game {
  private lastUpdateTime = 0;
  private systems = new Set<System>();
  private readonly entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  public addSystem(system: System) {
    this.systems.add(system);
  }

  public addSystems(systems: System[]) {
    systems.forEach((system) => this.systems.add(system));
  }

  private gameLoop() {
    const now = Date.now();
    const deltaTime = now - this.lastUpdateTime;
    this.lastUpdateTime = now;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private update(deltaTime: number) {
    for (const system of this.systems) {
      system.update(deltaTime, this.entityManager);
    }
  }

  private render() {
    for (const system of this.systems) {
      system.render();
    }
  }

  public run() {
    for (const system of this.systems) {
      system.preload();
    }
    this.gameLoop();
  }
}
