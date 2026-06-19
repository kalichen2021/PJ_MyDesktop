interface Vector {
  x: number;
  y: number;
  add(other: Vector): Vector;
  subtract(other: Vector): Vector;
  scale(factor: number): Vector;
}

/**
 * Vector constructor
 * @param x x coordinate
 * @param y y coordinate
 * @returns Vector
 */
class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(other: Vector) {
    return new Vector(this.x + other.x, this.y + other.y);
  }
  subtract(other: Vector) {
    return new Vector(this.x - other.x, this.y - other.y);
  }
  scale(factor: number) {
    return new Vector(this.x * factor, this.y * factor);
  }
}

type NumWithUnit<Unit extends string> = `${number}${Unit}`
const toNumber = (t: string): number => {
  return Number(t.match(/\d+/)?.[0]) || 0;
}
const isVector = (obj: any): obj is Vector => {
  return obj && typeof obj.x === 'number' && typeof obj.y === 'number' //!!!
}
class UnitVector<U extends string> extends Vector {
  unit: U;
  xo: NumWithUnit<U>;
  yo: NumWithUnit<U>;
  constructor(xo: NumWithUnit<U>, yo: NumWithUnit<U>);
  constructor(object: Vector, Unit: U);

  constructor(arg1: NumWithUnit<U> | Vector, arg2: NumWithUnit<U> | U) {
    if (isVector(arg1) && typeof arg2 === 'string') {
      super(arg1.x, arg1.y);
      this.unit = arg2 as U;
      this.xo = String(arg1.x) + arg2 as NumWithUnit<U>;
      this.yo = String(arg1.y) + arg2 as NumWithUnit<U>;
    } else {
      super(toNumber(arg1 as NumWithUnit<U>), toNumber(arg2 as NumWithUnit<U>));
      this.unit = this.__GetUnit__(arg1 as NumWithUnit<U>);
      this.xo = arg1 as NumWithUnit<U>;
      this.yo = arg2 as NumWithUnit<U>;
    }
  }
  // constructor() {

  // }
  static __toNumber__(t: string): number {
    return toNumber(t);
  }
  __GetUnit__(t: string): U {
    return t.match(/[a-zA-Z]/)?.[0] as U;
  }
  add(other: UnitVector<U>): UnitVector<U> {
    super.add(other);
    return this;
  }
  subtract(other: UnitVector<U>): UnitVector<U> {
    super.subtract(other);
    return this;
  }
  scale(factor: number): UnitVector<U> {
    super.scale(factor);
    return this;
  }
}

export { Vector, UnitVector };
