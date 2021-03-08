<script lang="ts">
  import { circlePathDef, ringArcPathDef } from "@/utilities/svg";

  import type { ModeDef } from "@/music/modes";
  import { createEventDispatcher } from "svelte";

  export let outerRadius: number;

  export let innerRadius: number;

  export let modeDefs: ModeDef[];

  const dispatch = createEventDispatcher<{ modeChanged: number }>();

  const fontSize = 8;

  const textRadius = (outerRadius + innerRadius) / 2;

  class Mode {
    public path: string;

    constructor(public def: ModeDef) {
      this.path = ringArcPathDef(innerRadius, outerRadius, 30);
    }

    get angle() {
      return -this.rotation;
    }

    get fontSize() {
      return Math.min(fontSize, 88 / this.name.length);
    }

    get name() {
      return this.def.name;
    }

    get rotation() {
      return 30 * this.def.semitones;
    }
  }

  const modes = modeDefs.map((def) => new Mode(def));

  function selectMode(mode: Mode, i: number) {
    selectedMode = mode;
    dispatch("modeChanged", i);
  }

  let selectedMode = modes[0];

  let wheelRotation = 0;

  $: {
    const diff = selectedMode.angle - wheelRotation;
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
      class:selected={mode === selectedMode}
      transform="rotate({mode.rotation})"
      on:click={() => selectMode(mode, i)}
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

  .mode.selected {
    cursor: default;
  }

  .mode:not(.selected) {
    cursor: pointer;
  }

  .mode path {
    fill: var(--gray-100);
    stroke: var(--color-border);
  }

  .mode:hover path {
    fill: var(--color-hover);
  }

  .mode:active path {
    fill: var(--color-active);
  }

  .mode text {
    fill: var(--color-black-key);
  }

  .mode circle {
    fill: var(--blue-400);
    stroke: var(--color-border);
  }

  .mode.selected path {
    fill: var(--green-400);
  }

  .mode.selected text {
    fill: var(--color-white-key);
  }
</style>
