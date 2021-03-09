<script lang="ts">
  import { ringArcPathDef } from "@/utilities/svg";

  import type { PlayButtonState } from "./types";

  export let radius: number;

  export let state: PlayButtonState;

  const pathRadius = radius / 2;

  function getLoadPathDef(radius: number) {
    return ringArcPathDef(radius * 2, radius * 1.75, 180);
  }

  function getPlayPathDef(radius: number) {
    const angle = (Math.PI * 2) / 3;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return `M ${x} ${y} L ${radius} 0 L ${x} ${-y} Z`;
  }

  function getStopPathDef(radius: number) {
    const l = Math.sin(Math.PI / 4) * radius;
    return `M -${l} ${l} L ${l} ${l} L ${l} ${-l} L ${-l} ${-l} Z`;
  }

  $: pathDef = (state === "loading"
    ? getLoadPathDef
    : state === "playing"
    ? getStopPathDef
    : getPlayPathDef)(pathRadius);
</script>

<g class="button {state}" on:click>
  <circle cx="0" cy="0" r={radius} fill="white" stroke="black" />
  <path d={pathDef} />
</g>

<style>
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .button {
    cursor: pointer;
  }

  circle {
    stroke: var(--color-border);
    fill: var(--white);
  }

  .button:hover circle {
    fill: var(--color-hover);
  }

  .button:active circle {
    fill: var(--red-500);
  }

  path {
    fill: var(--color-black-key);
    transform: rotate(0);
  }

  .loading path {
    animation: rotation 1s linear infinite;
    fill: var(--color-border);
  }
</style>
