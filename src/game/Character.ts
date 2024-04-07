import type Environment from "./Environment";

export default class Character {
  x: number;
  y: number;
  width: number = 1;
  height: number = 1;
  mass: number = 100;
  velocityX: number = 0;
  velocityY: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  onGround() {
    return this.y >= 3;
  }

  update(force: { x: number; y: number }, env: Environment) {
    this.velocityX += force.x / this.mass;
    this.velocityY += force.y / this.mass;

    const candidateX = this.x + this.velocityX;
    const candidateY = this.y + this.velocityY;
    // Check for collisions in the x direction
    this.x = candidateX;
    this.y = candidateY > 3 ? 3 : candidateY;
  }
}
