<script lang="ts">
  export let radius: number;

  export let state: "playing" | "stopped";

  const pathRadius = radius / 2;

  function playPathDef(radius: number) {
    const angle = (Math.PI * 2) / 3;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return `M ${x} ${y} L ${radius} 0 L ${x} ${-y} Z`;
  }

  function stopPathDef(radius: number) {
    const l = Math.sin(Math.PI / 4) * radius;
    return `M -${l} ${l} L ${l} ${l} L ${l} ${-l} L ${-l} ${-l} Z`;
  }

  $: pathDef = (state === "playing" ? stopPathDef : playPathDef)(pathRadius);
</script>

<g
  class="button"
  on:click
  on:mouseenter={() => (state = "playing")}
  on:mouseleave={() => (state = "stopped")}
>
  <circle cx="0" cy="0" r={radius} fill="white" stroke="black" />
  <path d={pathDef} />
</g>

<style>
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
  }
</style>
