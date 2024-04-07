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

  isOnGround() {
    return this.y >= 3;
  }

  applyForce(vector: { x: number; y: number }) {    
    this.velocityX += vector.x / this.mass;
    this.velocityY += vector.y / this.mass;
    console.log(this.velocityX, this.velocityY)
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
}
