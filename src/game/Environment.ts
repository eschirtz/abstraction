export type EnvironmentCell = "solid" | "empty";

export default class Environment {
  map: EnvironmentCell[][];

  constructor() {
    this.map = [
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "solid", "empty", "empty", "solid", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "solid", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "solid", "empty", "empty", "empty", "empty"],
      ["solid", "solid", "solid", "solid", "solid", "solid", "solid", "solid", "solid", "solid"],
      ["solid", "solid", "solid", "solid", "solid", "solid", "solid", "solid", "solid", "solid"],
    ];
  }

  /**
   * Returns the map as a one dimensional array
   */
  getMap1D(): EnvironmentCell[] {
    const flatMap: EnvironmentCell[] = [];
    for (let i = 0; i < this.map.length; i += 1) {
      for (let j = 0; j < this.map[i].length; j += 1) {
        flatMap.push(this.map[i][j]);
      }
    }
    return flatMap;
  }

  /**
   * Square bounding box collision detection
   * Origin at top left corner
   * @param x 
   * @param y 
   * @param width 
   * @param height 
   * @returns 
   */
  getCollisions(x: number, y: number, width: number, height: number): {x: number, y: number} {
    const collisions: {x: number, y: number} = {x: 0, y: 0};
    const left = Math.floor(x);
    const right = Math.floor(x + width);
    const top = Math.floor(y);
    const bottom = Math.floor(y + height);

    for (let i = top; i <= bottom; i += 1) {
      for (let j = left; j <= right; j += 1) {
        if (this.map[i] && this.map[i][j] === "solid") {
          if (i === top) {
            collisions.y = -1;
          }
          if (i === bottom) {
            collisions.y = 1;
          }
          if (j === left) {
            collisions.x = -1;
          }
          if (j === right) {
            collisions.x = 1;
          }
        }
      }
    }
    return collisions;
  }
    
}
