<script lang="ts">
  import type { PlayButtonState } from "./types";
  import PlayStopPath from "./PlayStopPath.svelte";
  import { ringArcPathDef } from "@/utilities/svg";

  export let radius: number;

  export let state: PlayButtonState;

  let loadPathDefinition = ringArcPathDef(radius, radius * 0.875, 180);
</script>

<g class={state} on:click>
  <circle cx="0" cy="0" r={radius} fill="white" stroke="black" />
  {#if state === "loading"}
    <path d={loadPathDefinition} />
  {:else}
    <PlayStopPath radius={radius / 2 - 1} {state} />
  {/if}
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

  g:not(.loading) {
    cursor: pointer;
  }

  circle {
    fill: var(--white);
    stroke: var(--color-border);
  }

  @media (hover: hover) {
    g:not(.loading, .playing):hover circle {
      fill: var(--color-hover);
    }
  }

  g:not(.loading):active circle {
    fill: var(--color-active);
  }

  g.playing circle {
    fill: var(--color-hover);
  }

  path {
    animation: rotation 1s linear infinite;
    fill: var(--color-border);
    stroke: none;
  }
</style>
