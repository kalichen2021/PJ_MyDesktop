import { Metrics, UnitVector, Vector } from './DataType';
import { test, expect } from 'vitest';

test('Metrics', () => {
  const t = Metrics(1, 'm');
  const u = Metrics(2, 'm');
  const v = t.add(u);
  expect(String(t)).toBe('1m');
  expect(String(v)).toBe('3m');
});

test("UnitVector", () => {
  // const x: TMetrics<"m"> = "1m"
  const a = new UnitVector<"m">(Metrics(1, "m"), Metrics(2, "m"))
  const b = new UnitVector<"m">(Metrics(3, "m"), Metrics(6, "m"))
  expect(a.add(b)).toMatchObject({
    unit: 'm',
    x: { value: 4, unit: 'm' },
    y: { value: 8, unit: 'm' }
  })
})

test("2initMetrics", () => {
  const a = Metrics(1, 'm');
  const b = Metrics<"m">("2m")
  expect(a.add(b)).toMatchObject({
    unit: 'm',
    value: 3,
  })
})
