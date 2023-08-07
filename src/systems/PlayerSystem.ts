import { vec3 } from "gl-matrix";
import { Camera } from "../cameras/Camera";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Entity } from "../entities/Entity";
import { InputManager } from "../utils/InputManager";
import { System } from "./System";

export class PlayerSystem extends System {
  private playerEntity: Entity;
  private camera: Camera;
  private cameraOffset: vec3 = vec3.fromValues(0, 2, -5); // Adjust camera offset as needed
  private inputManager: InputManager;
  private readonly movementSpeed: number = 0.1;
  private readonly jumpForce: number = 0.3;

  constructor(playerEntity: Entity, camera: Camera) {
    super();

    this.playerEntity = playerEntity;
    this.camera = camera;
    this.inputManager = new InputManager();
  }

  async preload() { }

  update(deltaTime: number) {

  }

  render() { }

  private handlePlayerMovement(
    rigidBodyComponent: RigidBodyComponent,
    transformComponent: TransformComponent,
    deltaTime: number
  ) {
    // Handle player movement based on keyboard input or other input methods
    const playerVelocity = rigidBodyComponent.velocity;
    const movementInput = this.getInputMovementVector(); // Implement this method to get the movement input vector

    if (movementInput.length > 0) {
      // Apply movement speed
      const movement = vec3.scale(vec3.create(), movementInput, this.movementSpeed);
      console.log(transformComponent.position);
      vec3.add(playerVelocity, playerVelocity, movement);
    }

    // Update the player position based on velocity and deltaTime
    vec3.scaleAndAdd(transformComponent.position, transformComponent.position, playerVelocity, deltaTime);
  }

  private handlePlayerJump(rigidBodyComponent: RigidBodyComponent) {
    // Handle player jumping based on keyboard input or other input methods
    if (this.inputManager.isKeyPressed(" ")) {
      // Apply jump force to the player's Y-axis velocity
      rigidBodyComponent.velocity[1] = this.jumpForce;
    }
  }

  private getInputMovementVector(): vec3 {
    // Assuming the InputManager provides a method called getMovementInput
    const movementInput = this.inputManager.getMovementInput();

    // Convert the input to a 3D movement vector
    const movementVector = vec3.fromValues(movementInput[0], 0, movementInput[1]);

    // Normalize the movement vector to ensure consistent movement speed in all directions
    if (vec3.length(movementVector) > 0) {
      vec3.normalize(movementVector, movementVector);
    }

    return movementVector;
  }
}