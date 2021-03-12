<script lang="ts">
  import { PathMorphAnimator, PathMorpher } from "@/utilities/svg";
  import { ease } from "@/utilities/easing";

  import type { PlayButtonState } from "./types";

  export let radius: number;

  export let state: PlayButtonState;

  export let animationDuration = 250;

  export let animationEasing = ease;

  function createPathMorphAnimator(radius: number, duration: number) {
    const template = "M % % L % % L % % L % % Z";
    const from = getPlayPathValues(radius);
    const to = getStopPathValues(radius);
    const morpher = new PathMorpher(template, from, to);
    const animator = new PathMorphAnimator(morpher, duration, (def) => {
      definition = def;
    });
    animator.ease = animationEasing;
    return animator;
  }

  function getPlayPathValues(radius: number) {
    const angle = (Math.PI * 2) / 3;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return [x, y, radius, 0, radius, 0, x, -y];
  }

  function getStopPathValues(radius: number) {
    const l = Math.sin(Math.PI / 4) * radius;
    return [-l, l, l, l, l, -l, -l, -l];
  }

  const animator = createPathMorphAnimator(radius, animationDuration);

  let definition: string;

  $: {
    if (state === "loading") {
      animator.set(0);
    } else {
      animator.animate(state === "playing" ? 1 : 0);
    }
  }
</script>

<path d={definition} />

<style>
  path {
    fill: var(--color-black-key);
    stroke: var(--color-black-key);
    stroke-linejoin: round;
  }
</style>
