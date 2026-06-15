interface Axis {
  x: number;
  y: number;
  add(other: Axis): Axis;
  subtract(other: Axis): Axis;
  scale(factor: number): Axis;
}

/**
 * Axis constructor
 * @param x x axis
 * @param y y axis
 * @returns Axis
 */
const Axis = (x: number, y: number): Axis => {
  return {
    x,
    y,
    add(other: Axis) {
      return Axis(this.x + other.x, this.y + other.y);
    },
    subtract(other: Axis) {
      return Axis(this.x - other.x, this.y - other.y);
    },
    scale(factor: number) {
      return Axis(this.x * factor, this.y * factor);
    },
  };
};

export { Axis };
