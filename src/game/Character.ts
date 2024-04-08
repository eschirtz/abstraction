import type Environment from "./Environment";

export default class Character {
  x: number;
  y: number;
  width: number = 1;
  height: number = 1;
  mass: number = 500;
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
    const collisions = env.getCollisions(
      candidateX,
      candidateY,
      this.width,
      this.height
    );

    const bounceFactor = 0.5;

    if (collisions.x === -1 || collisions.x === 1) {
      this.velocityX = -this.velocityX * bounceFactor;
    } else {
      this.x = candidateX;
    }

    if (collisions.y === -1 || collisions.y === 1) {
      this.velocityY = -this.velocityY * bounceFactor;
    } else {
      this.y = candidateY;
    }
  }
}
