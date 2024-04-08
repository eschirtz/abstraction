export type EnvironmentCell = "solid" | "empty";

export default class Environment {
  map: EnvironmentCell[][];

  constructor() {
    // Column major order
    this.map = [
      [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      [
        "empty",
        "empty",
        "solid",
        "empty",
        "empty",
        "solid",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "solid",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      [
        "empty",
        "empty",
        "empty",
        "solid",
        "solid",
        "solid",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      [
        "solid",
        "solid",
        "solid",
        "solid",
        "solid",
        "solid",
        "solid",
        "solid",
        "solid",
        "solid",
      ],
      [
        "solid",
        "solid",
        "solid",
        "solid",
        "solid",
        "solid",
        "solid",
        "solid",
        "solid",
        "solid",
      ],
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
  getCollisions(
    x: number,
    y: number,
    width: number,
    height: number
  ): { x: number; y: number } {
    const collisions: { x: number; y: number } = { x: 0, y: 0 };
    const left = Math.floor(x);
    const right = Math.floor(x + width);
    const top = Math.floor(y);
    const bottom = Math.floor(y + height);

    // Check world boundries first
    if (left < 0) {
      collisions.x = -1;
    } else if (right > this.map[0].length) {
      collisions.x = 1;
    } else if (top < 0) {
      collisions.y = -1;
    } else if (bottom > this.map.length) {
      collisions.y = 1;
    }

    if (collisions.x !== 0 || collisions.y !== 0) return collisions;

    // Check for collisions with map cells
    if (this.map[top][left] === "solid" || this.map[bottom][left] === "solid") {
      collisions.x = -1;
    } else if (
      this.map[top][right] === "solid" ||
      this.map[bottom][right] === "solid"
    ) {
      collisions.x = 1;
    } else if (
      this.map[top][left] === "solid" ||
      this.map[top][right] === "solid"
    ) {
      collisions.y = -1;
    } else if (
      this.map[bottom][left] === "solid" ||
      this.map[bottom][right] === "solid"
    ) {
      collisions.y = 1;
    }
    return collisions;
  }
}
