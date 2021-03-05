<script lang="ts">
  import type { ModeDef } from "@/music/modes";

  import { circlePathDef, ringArcPathDef } from "@/utilities/svg";

  export let outerRadius: number;

  export let innerRadius: number;

  export let modeDefs: ModeDef[];

  const fontSize = 8;

  const textRadius = (outerRadius + innerRadius) / 2;

  const modes = modeDefs.map(([semitones, name]) => {
    return {
      name,
      rotation: 30 * semitones,
      path: ringArcPathDef(innerRadius, outerRadius, 30),
      get angle() {
        return -this.rotation;
      },
      get fontSize() {
        return Math.min(fontSize, 88 / this.name.length);
      },
    };
  });

  let activeMode = modes[0];

  let wheelRotation = 0;

  $: {
    const diff = activeMode.angle - wheelRotation;
    wheelRotation += (((diff % 360) + 540) % 360) - 180;
  }
</script>

<defs>
  <path id="mode-text-circle" d={circlePathDef(textRadius)} />
</defs>

<g class="wheel" style="transform: rotate({wheelRotation + 'deg'})">
  <circle r={innerRadius} />
  {#each modes as mode, i}
    <g
      class="mode"
      class:active={mode === activeMode}
      transform="rotate({mode.rotation})"
      on:click={() => (activeMode = mode)}
    >
      <path d={mode.path} transform="rotate(-90)" />
      <text
        text-anchor="middle"
        dominant-baseline="middle"
        transform="rotate(15)"
      >
        <textPath startOffset="50%" xlink:href="#mode-text-circle">
          <tspan alignment-baseline="middle" style="font-size: {fontSize}px">
            {`${i + 1}. `}
          </tspan>
          <tspan
            alignment-baseline="middle"
            style="font-size: {mode.fontSize}px"
          >
            {mode.name}
          </tspan>
        </textPath>
      </text>
      <circle cy={-innerRadius} r="5" transform="rotate(15)" />
    </g>
  {/each}
</g>

<style>
  .wheel > circle {
    fill: none;
    stroke: var(--color-border);
  }

  .mode:not(.active) {
    cursor: pointer;
  }

  .mode.active {
    cursor: default;
  }

  .mode path {
    fill: var(--gray-100);
    stroke: var(--color-border);
  }

  .mode:not(.active):hover path {
    fill: var(--green-400);
  }

  .mode:not(.active):active path {
    fill: var(--color-active);
  }

  .mode text {
    fill: var(--color-black-key);
  }

  .mode circle {
    fill: var(--blue-400);
    stroke: var(--color-border);
  }
</style>
