import { Entity } from "../entities/Entity";

export class QuadtreeNode {
  entities: Entity[] = [];
  children: QuadtreeNode[] = [];
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;

  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }
}