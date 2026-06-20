import type { Metrics } from './DataType.d';


function Metrics<U extends string>(value: number, unit: U): Metrics<U> {
  return {
    unit,
    value,
    add(arg1: Metrics<U> | number): Metrics<U> {
      return (
        Metrics(Number(this) + Number(arg1), this.unit)
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
  __GetUnit__(t: string): U {
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
      Metrics(this.x.value - other.x.value, this.unit) as Metrics<U>,
      Metrics(this.y.value - other.y.value, this.unit) as Metrics<U>
    );
  }
  scale(factor: number): UnitVector<U> {
    return new UnitVector<U>(
      Metrics(this.x.value * factor, this.unit) as Metrics<U>,
      Metrics(this.y.value * factor, this.unit) as Metrics<U>
    );
  }
}

export { Metrics, Vector, UnitVector };
