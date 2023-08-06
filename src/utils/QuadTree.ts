import { mat4, vec3 } from "gl-matrix";
import { CollisionComponent } from "../components/CollisionComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Entity } from "../entities/Entity";
import { QuadtreeNode } from "./QuadTreeNode";
import { MAX_ENTITIES_PER_NODE } from "./constants";

export class Quadtree {
  root: QuadtreeNode;

  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    this.root = new QuadtreeNode(minX, minY, maxX, maxY);
  }

  insertEntity(entity: Entity, collisionComponent: CollisionComponent, transformComponent: TransformComponent) {
    this.insertEntityRecursive(
      this.root,
      entity,
      collisionComponent,
      transformComponent,
      this.root.minX,
      this.root.minY,
      this.root.maxX,
      this.root.maxY
    );
  }

  insertEntityRecursive(
    node: QuadtreeNode,
    entity: Entity,
    collisionComponent: CollisionComponent,
    transformComponent: TransformComponent,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ) {
    // Check if the entity's bounding box intersects with the current quadtree node's boundary
    const aMinMax = this.calculateMinMaxVertices(collisionComponent, transformComponent);
    const intersects = aMinMax.max[0] > minX && aMinMax.min[0] < maxX &&
      aMinMax.max[1] > minY && aMinMax.min[1] < maxY;

    if (intersects) {
      // If the current node has too many entities (based on some threshold), split it into four children nodes
      if (node.entities.length >= MAX_ENTITIES_PER_NODE) {
        this.splitQuadtreeNode(node, minX, minY, maxX, maxY);
      }

      // Add the entity to the current node's entities array
      node.entities.push(entity);

      // Recursively insert the entity into the appropriate child nodes
      if (node.children.length > 0) {
        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;

        // Find the appropriate child node for the entity and insert it
        if (aMinMax.max[0] > midX && aMinMax.min[0] < maxX) {
          if (aMinMax.max[1] > midY && aMinMax.min[1] < maxY) {
            this.insertEntityRecursive(node.children[0], entity, collisionComponent, transformComponent, midX, midY, maxX, maxY);
          }
          if (aMinMax.max[1] > minY && aMinMax.min[1] < midY) {
            this.insertEntityRecursive(node.children[1], entity, collisionComponent, transformComponent, midX, minY, maxX, midY);
          }
        }
        if (aMinMax.max[0] > minX && aMinMax.min[0] < midX) {
          if (aMinMax.max[1] > midY && aMinMax.min[1] < maxY) {
            this.insertEntityRecursive(node.children[2], entity, collisionComponent, transformComponent, minX, midY, midX, maxY);
          }
          if (aMinMax.max[1] > minY && aMinMax.min[1] < midY) {
            this.insertEntityRecursive(node.children[3], entity, collisionComponent, transformComponent, minX, minY, midX, midY);
          }
        }
      }
    }
  }

  private splitQuadtreeNode(node: QuadtreeNode, minX: number, minY: number, maxX: number, maxY: number) {
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;

    // Create four children nodes
    node.children[0] = new QuadtreeNode(minX, minY, maxX, maxY); // Top-right
    node.children[1] = new QuadtreeNode(minX, minY, maxX, maxY); // Bottom-right
    node.children[2] = new QuadtreeNode(minX, minY, maxX, maxY); // Bottom-left
    node.children[3] = new QuadtreeNode(minX, minY, maxX, maxY); // Top-left

    // Move the entities from the current node to the appropriate child nodes
    for (let i = node.entities.length - 1; i >= 0; i--) {
      const entity = node.entities[i];
      const collisionComponent = entity.getComponent<CollisionComponent>("CollisionComponent");
      const transformComponent = entity.getComponent<TransformComponent>("TransformComponent");
      if (!collisionComponent || !transformComponent) continue;
      const aMinMax = this.calculateMinMaxVertices(collisionComponent, transformComponent);

      if (aMinMax.max[0] > midX && aMinMax.min[0] < maxX) {
        if (aMinMax.max[1] > midY && aMinMax.min[1] < maxY) {
          node.children[0].entities.push(entity); // Top-right
        }
        if (aMinMax.max[1] > minY && aMinMax.min[1] < midY) {
          node.children[1].entities.push(entity); // Bottom-right
        }
      }
      if (aMinMax.max[0] > minX && aMinMax.min[0] < midX) {
        if (aMinMax.max[1] > midY && aMinMax.min[1] < maxY) {
          node.children[2].entities.push(entity); // Bottom-left
        }
        if (aMinMax.max[1] > minY && aMinMax.min[1] < midY) {
          node.children[3].entities.push(entity); // Top-left
        }
      }

      node.entities.splice(i, 1);
    }
  }

  calculateMinMaxVertices(collisionComponent: CollisionComponent, transform: TransformComponent): { min: vec3; max: vec3 } {
    const halfSize = vec3.scale(vec3.create(), collisionComponent.size, 0.5);

    // Get the rotation matrix from the quaternion
    const rotationMatrix = mat4.fromQuat(mat4.create(), transform.rotation);

    // Compute the scaled local bounding box (in the object's local space)
    const scaledHalfSize = vec3.multiply(vec3.create(), halfSize, transform.scale);

    // Transform the local bounding box to world space
    const min = vec3.create();
    const max = vec3.create();

    for (let x = -1; x <= 1; x += 2) {
      for (let y = -1; y <= 1; y += 2) {
        for (let z = -1; z <= 1; z += 2) {
          const localCorner = vec3.fromValues(x * scaledHalfSize[0], y * scaledHalfSize[1], z * scaledHalfSize[2]);

          // Apply the object's rotation to the local corner
          vec3.transformMat4(localCorner, localCorner, rotationMatrix);

          // Add the object's position to get the corner in world space
          vec3.add(localCorner, localCorner, transform.position);

          // Update the min and max vertices
          vec3.min(min, min, localCorner);
          vec3.max(max, max, localCorner);
        }
      }
    }

    return { min, max };
  }

  traverseQuadtree(childNode: QuadtreeNode, potentialCollisions: Entity[], aMinMax: { min: vec3; max: vec3 }) {
    this.traverseQuadtreeRecursive(childNode, potentialCollisions, aMinMax);
  }

  traverseQuadtreeRecursive(node: QuadtreeNode, potentialCollisions: Entity[], aMinMax: { min: vec3; max: vec3 }) {
    if (!node || node.entities.length === 0) {
      return;
    }

    // Check if the node's bounding box intersects with the entity's bounding box
    if (this.intersectsQuadtreeNode(node, aMinMax)) {
      // Add the entities in the current node to the potentialCollisions array
      potentialCollisions.push(...node.entities);

      // Recursively traverse the child nodes
      for (const childNode of node.children) {
        this.traverseQuadtree(childNode, potentialCollisions, aMinMax);
      }
    }
  }

  intersectsQuadtreeNode(node: QuadtreeNode, aMinMax: { min: vec3; max: vec3 }): boolean {
    return (
      aMinMax.max[0] > node.minX && aMinMax.min[0] < node.maxX &&
      aMinMax.max[1] > node.minY && aMinMax.min[1] < node.maxY
    );
  }
}