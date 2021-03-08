export function joinPaths(a: string, b: string) {
  return a.slice(-1) === "/" ? a + b : a + "/" + b;
}
