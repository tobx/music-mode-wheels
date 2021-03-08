const degToRad = Math.PI / 180;

export function circlePathDef(radius: number) {
  return [
    `M 0 ${radius}`,
    `a ${radius} ${radius} 0 0 1 0 ${-2 * radius}`,
    `a ${radius} ${radius} 0 0 1 0 ${2 * radius}`,
  ].join(" ");
}

export function ringArcPathDef(
  innerRadius: number,
  outerRadius: number,
  angle: number
) {
  const radians = angle * degToRad;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const inner = { x: cos * innerRadius, y: sin * innerRadius };
  const outer = { x: cos * outerRadius, y: sin * outerRadius };
  return [
    `M ${outerRadius} 0`,
    `A ${outerRadius} ${outerRadius} 0 0 1 ${outer.x} ${outer.y}`,
    `L ${inner.x} ${inner.y}`,
    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerRadius} 0`,
    `Z`,
  ].join(" ");
}
