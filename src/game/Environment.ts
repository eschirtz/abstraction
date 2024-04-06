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
}
