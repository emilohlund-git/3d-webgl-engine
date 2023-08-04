import { UUID } from "../utils";

export abstract class Component {
  private id = UUID();
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  getId() {
    return this.id;
  }
}