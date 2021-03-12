function blend(a: number, b: number, alpha: number) {
  return a + alpha * (b - a);
}

export function ease(t: number) {
  const a = easeInCubic(t);
  const b = easeOutCubic(t);
  return blend(a, b, b);
}

export function easeInCubic(t: number) {
  return t * t * t;
}

export function easeOutCubic(t: number) {
  return --t * t * t + 1;
}

export function linear(t: number) {
  return t;
}
