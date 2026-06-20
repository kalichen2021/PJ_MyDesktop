export interface Metrics<U extends string> extends Calcable<Metrics<U>> {
  unit: U;
  value: number;
  toString(): string;
  valueOf(): number;
}

export interface Calcable<T> {
  add(arg1: number | T, arg2?: number): Calcable<T>;
}

export type NumWithUnit<Unit extends string> = `${number}${Unit}`
