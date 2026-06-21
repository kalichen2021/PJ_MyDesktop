export interface Metrics<U extends string> extends Calcable<Metrics<U>> {
  unit: U;
  value: number;
  toString(): string;
  valueOf(): number;
}

export type PrimaryMetrics<U extends string> = Pick<Metrics<U>, 'unit' | 'value'>

export type AppearanceMetric<U extends string> = `${number}${U}`

export interface Calcable<T> {
  add(arg1: number | T, arg2?: number): Calcable<T>;
  subtract(arg1: number | T, arg2?: number): Calcable<T>;
  scale(factor: number): Calcable<T>;
}

export type NumWithUnit<Unit extends string> = `${number}${Unit}`



function Metrics<U extends string>(arg1: number | AppearanceMetric<U>, arg2?: U): Metrics<U> {
  let unit: U;
  let value: number;
  if (typeof arg1 === 'number' && arg2) {
    unit = arg2;
    value = arg1;
  } else {
    unit = (arg1 as unknown as string).match(/[a-zA-Z]+/)?.[0] as U;
    value = Number((arg1 as unknown as string).match(/\d+/)?.[0]) || 0;
  }
  return {
    unit,
    value,
    add(arg1: Metrics<U> | number): Metrics<U> {
      return (
        Metrics(Number(this) + Number(arg1), this.unit)
      ) as unknown as Metrics<U>;
    },
    subtract(arg1: Metrics<U> | number): Metrics<U> {
      return (
        Metrics(Number(this) - Number(arg1), this.unit)
      ) as unknown as Metrics<U>;
    },
    scale(factor: number): Metrics<U> {
      return (
        Metrics(Number(this) * factor, this.unit)
      ) as unknown as Metrics<U>;
    },
    toString(): string {
      return `${value}${unit}`;
    },
    valueOf(): number {
      return value;
    }
  };
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
  add(arg1: Vector | number, arg2?: number) {
    if (!isVector(arg1) && arg2) {
      return new Vector(this.x + arg1, this.y + arg2);
    } else if (isVector(arg1)) {
      return new Vector(this.x + arg1.x, this.y + arg1.y);
    }
    return new Vector(0, 0)
  }
  subtract(arg1: Vector | number, arg2?: number) {
    if (!isVector(arg1) && arg2) {
      return new Vector(this.x - arg1, this.y - arg2);
    } else if (isVector(arg1)) {
      return new Vector(this.x - arg1.x, this.y - arg1.y);
    }
    return new Vector(0, 0)
  }
  scale(factor: number) {
    return new Vector(this.x * factor, this.y * factor);
  }
}

const toNumber = (t: string): number => {
  return Number(t.match(/\d+/)?.[0]) || 0;
}
const isVector = (obj: any): obj is Vector => {
  return obj && typeof obj.x === 'number' && typeof obj.y === 'number' //!!!
}
class UnitVector<U extends string> {
  unit: U;
  x: Metrics<U>;
  y: Metrics<U>;
  constructor(x: Metrics<U>, y: Metrics<U>);
  constructor(object: Vector, Unit: U);

  constructor(arg1: Vector | Metrics<U>, arg2: U | Metrics<U>) {
    if (isVector(arg1) && typeof arg2 === 'string') {
      this.x = arg1.x + arg2 as unknown as Metrics<U>;
      this.y = arg1.y + arg2 as unknown as Metrics<U>;
      this.unit = arg2;
    } else {
      this.x = arg1 as Metrics<U>;
      this.y = arg2 as Metrics<U>;
      this.unit = this.__GetUnit__(arg1.toString());
    }
  }
  // constructor() {

  // }
  static __toNumber__(t: string): number {
    return toNumber(t);
  }
  private __GetUnit__(t: string): U {
    return t.match(/[a-zA-Z]/)?.[0] as U;
  }
  add(other: UnitVector<U>): UnitVector<U> {
    return new UnitVector<U>(
      this.x.add(other.x) as Metrics<U>,
      this.y.add(other.y) as Metrics<U>
    );
  }
  subtract(other: UnitVector<U>): UnitVector<U> {
    return new UnitVector<U>(
      this.x.subtract(other.x) as Metrics<U>,
      this.y.subtract(other.y) as Metrics<U>
    );
  }
  scale(factor: number): UnitVector<U> {
    return new UnitVector<U>(
      this.x.scale(factor) as Metrics<U>,
      this.y.scale(factor) as Metrics<U>
    );
  }
}

export { Metrics, Vector, UnitVector };
