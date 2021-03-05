<script lang="ts">
  import type { ModeDef } from "@/music/modes";

  import MelodicMajorModeWheel from "./MelodicMajorModeWheel.svelte";
  import PianoWheel from "./PianoWheel.svelte";

  export let modeDefs: ModeDef[];

  const width = 256;
  const height = 256;
  const keyOuterRadius = (Math.min(width, height) * 3) / 8;
  const modeOuterRadius = (Math.min(width, height) * 15) / 32;
</script>

<svg viewBox="0 0 {width} {height}">
  <g transform="translate({width / 2}, {height / 2}) rotate(-15)">
    <PianoWheel radius={keyOuterRadius} />
    <MelodicMajorModeWheel
      outerRadius={modeOuterRadius}
      innerRadius={keyOuterRadius}
      {modeDefs}
    />
  </g>
</svg>

<style>
  svg {
    --color-black-key: var(--gray-700);
    --color-white-key: var(--white);

    stroke-width: 0.67;
    user-select: none;

    -webkit-tap-highlight-color: transparent;
    -moz-tap-highlight-color: transparent;
    -o-tap-highlight-color: transparent;
    tap-highlight-color: transparent;
  }

  svg :global(.wheel) {
    transition: transform 0.5s ease-in-out;
  }
</style>
