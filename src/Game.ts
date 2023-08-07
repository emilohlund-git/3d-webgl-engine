import { EntityManager } from "./entities/EntityManager";
import { System } from "./systems/System";

export class Game {
  private prevTimestamp = 0;
  private deltaTime = 0;
  private systems = new Set<System>();
  private readonly entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
    this.gameLoop = this.gameLoop.bind(this);
  }

  public addSystem(system: System) {
    this.systems.add(system);
  }

  public addSystems(systems: System[]) {
    systems.forEach((system) => this.systems.add(system));
  }

  private gameLoop() {
    const currentTimeStamp = performance.now();
    this.deltaTime = (currentTimeStamp - this.prevTimestamp) / 1000;
    this.prevTimestamp = currentTimeStamp;

    this.update(this.deltaTime);
    this.render();

    requestAnimationFrame(this.gameLoop);
  }

  private update(deltaTime: number) {
    for (const system of this.systems) {
      system.update(deltaTime, this.entityManager);
    }
  }

  private render() {
    for (const system of this.systems) {
      system.render(this.entityManager);
    }
  }

  public async run() {
    for (const system of this.systems) {
      await system.preload(this.entityManager);
    }
    this.gameLoop();
  }
}
