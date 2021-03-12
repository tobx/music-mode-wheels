import { AnimationLoop } from "./animation";
import { linear } from "./easing";

const degToRad = Math.PI / 180;

export function circlePathDef(radius: number) {
  return [
    `M 0 ${radius}`,
    `a ${radius} ${radius} 0 0 1 0 ${-2 * radius}`,
    `a ${radius} ${radius} 0 0 1 0 ${2 * radius}`,
  ].join(" ");
}

export function ringArcPathDef(
  outerRadius: number,
  innerRadius: number,
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

export class PathMorpher {
  private parts: string[];

  constructor(
    template: string,
    private from: number[],
    private to: number[],
    placeholder = "%"
  ) {
    this.parts = template.split(placeholder);
    if (from.length !== to.length) {
      throw new Error("'from' length ≠ 'to' length");
    }
    if (from.length + 1 !== this.parts.length) {
      throw new Error("placeholder count ≠ values count");
    }
  }

  morph(fraction: number) {
    return this.parts.reduce((path, part, i) => {
      const index = i - 1;
      const from = this.from[index];
      const to = this.to[index];
      const interpolated = from + fraction * (to - from);
      return path + interpolated + part;
    });
  }
}

export class PathMorphAnimator {
  public ease = linear;

  private loop = new AnimationLoop();

  private position = 0;

  constructor(
    private morpher: PathMorpher,
    private duration: number,
    private update: (pathDef: string) => void
  ) {}

  animate(to: number) {
    const from = this.position;
    const displacement = to - this.position;
    const duration = Math.abs(displacement) * this.duration;
    this.loop.update = (fraction) => {
      this.position = from + this.ease(fraction) * displacement;
      this.triggerUpdate();
    };
    this.loop.start(duration);
  }

  set(position: number) {
    this.position = position;
    this.triggerUpdate();
  }

  triggerUpdate() {
    this.update(this.morpher.morph(this.position));
  }

  stop() {
    this.loop.stop();
  }
}
