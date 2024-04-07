export default class Character {
  x: number;
  y: number;
  width: number = 1;
  height: number = 1;
  mass: number = 1;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update() {}
}
