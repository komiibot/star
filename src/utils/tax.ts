export function taxItem(value: number, tax: number): number {
  const finalValue = value * (1 + tax / 100);
  const price = +finalValue.toFixed(2);

  return Math.trunc(price);
}
