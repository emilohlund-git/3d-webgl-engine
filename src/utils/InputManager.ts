import { vec2 } from "gl-matrix";

export class InputManager {
  private keysPressed: { [key: string]: boolean } = {};
  private mouseButtonsPressed: { [button: number]: boolean } = {};
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor() {
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
    document.addEventListener("keyup", (event) => this.handleKeyUp(event));
    document.addEventListener("mousedown", (event) => this.handleMouseDown(event));
    document.addEventListener("mouseup", (event) => this.handleMouseUp(event));
    document.addEventListener("mousemove", (event) => this.handleMouseMove(event));
  }

  private handleKeyDown(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
  }

  private handleKeyUp(event: KeyboardEvent) {
    this.keysPressed[event.key] = false;
  }

  private handleMouseDown(event: MouseEvent) {
    this.mouseButtonsPressed[event.button] = true;
  }

  private handleMouseUp(event: MouseEvent) {
    this.mouseButtonsPressed[event.button] = false;
  }

  private handleMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  isMouseButtonDown(button: number): boolean {
    return this.mouseButtonsPressed[button] || false;
  }

  getMouseX(): number {
    return this.mouseX;
  }

  getMouseY(): number {
    return this.mouseY;
  }

  isKeyPressed(key: string): boolean {
    return !!this.keysPressed[key];
  }

  getMovementInput(): vec2 {
    // Initialize the movement vector with zero values
    const movementInput: vec2 = vec2.create();

    // Check if the keys for movement are pressed and set the corresponding values in the movement vector
    console.log(this.keysPressed)
    if (this.isKeyPressed("w") || this.isKeyPressed("ArrowUp")) {
      movementInput[1] -= 1; // Forward movement (negative Z-axis)
    }
    if (this.isKeyPressed("s") || this.isKeyPressed("ArrowDown")) {
      movementInput[1] += 1; // Backward movement (positive Z-axis)
    }
    if (this.isKeyPressed("a") || this.isKeyPressed("ArrowLeft")) {
      movementInput[0] -= 1; // Left movement (negative X-axis)
    }
    if (this.isKeyPressed("d") || this.isKeyPressed("ArrowRight")) {
      movementInput[0] += 1; // Right movement (positive X-axis)
    }

    // Normalize the movement vector to ensure consistent movement speed in all directions
    if (vec2.length(movementInput) > 0) {
      vec2.normalize(movementInput, movementInput);
    }

    return movementInput;
  }
}
