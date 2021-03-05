export type Point = {
  x: number;
  y: number;
};

const degToRad = Math.PI / 180;

export function circlePathDef(r: number) {
  return [
    `M 0 ${r}`,
    `a ${r} ${r} 0 0 1 0 ${-2 * r}`,
    `a ${r} ${r} 0 0 1 0 ${2 * r}`,
  ].join("");
}

export function ringArcPathDef(
  innerRadius: number,
  outerRadius: number,
  angle: number
) {
  const rad = angle * degToRad;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const inner: Point = { x: cos * innerRadius, y: sin * innerRadius };
  const outer: Point = { x: cos * outerRadius, y: sin * outerRadius };
  return [
    `M ${outerRadius} 0`,
    `A ${outerRadius} ${outerRadius} 0 0 1 ${outer.x} ${outer.y}`,
    `L ${inner.x} ${inner.y}`,
    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerRadius} 0`,
    `Z`,
  ].join(" ");
}
