export function rotate<T>(array: T[], index: number) {
  return [...array.slice(index), ...array.slice(0, index)];
}
