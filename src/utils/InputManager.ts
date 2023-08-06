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
}
