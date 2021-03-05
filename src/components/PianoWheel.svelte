<script lang="ts">
  import { circlePathDef, ringArcPathDef } from "@/utilities/svg";

  export let radius: number;

  const blackKeyInnerRadius = (2 / 3) * radius;
  const whiteKeyInnerRadius = radius / 2;
  const keyTextRadius = (radius + blackKeyInnerRadius) / 2 - 1;

  function createKey(
    type: "black" | "white",
    name: string,
    rotation: number,
    keyAngle: number = 30,
    textAngle: number = 15
  ) {
    const isWhite = type === "white";
    const innerRadius = isWhite ? whiteKeyInnerRadius : blackKeyInnerRadius;
    return {
      type,
      name,
      rotation,
      textAngle,
      path: ringArcPathDef(innerRadius, radius, keyAngle),
      get angle() {
        return 15 - rotation - textAngle;
      },
      isWhite,
    };
  }

  const keys = [
    createKey("white", "C", 0, 45, 15),
    createKey("black", "C♯ / D♭", 30),
    createKey("white", "D", 45, 60, 30),
    createKey("black", "D♯ / E♭", 90),
    createKey("white", "E", 105, 45, 30),
    createKey("white", "F", 150, 45, 15),
    createKey("black", "F♯ / G♭", 180),
    createKey("white", "G", 195, 60, 30),
    createKey("black", "G♯ / A♭", 240),
    createKey("white", "A", 255, 60, 30),
    createKey("black", "A♯ / B♭", 300),
    createKey("white", "B", 315, 45, 30),
  ];

  const blackKeys = keys.filter((key) => !key.isWhite);

  const whiteKeys = keys.filter((key) => key.isWhite);

  let activeKey = keys[0];

  let wheelRotation = 0;

  $: {
    const diff = activeKey.angle - wheelRotation;
    wheelRotation += (((diff % 360) + 540) % 360) - 180;
  }
</script>

<defs>
  <path id="key-text-circle" d={circlePathDef(keyTextRadius)} />
</defs>

<g class="wheel" style="transform: rotate({wheelRotation + 'deg'})">
  {#each whiteKeys.concat(blackKeys) as key}
    <g
      class="key {key.type}"
      class:active={key === activeKey}
      transform="rotate({key.rotation})"
      on:click={() => (activeKey = key)}
    >
      <path d={key.path} transform="rotate(-90)" />
      <text dominant-baseline="middle" transform="rotate({key.textAngle})">
        <textPath
          startOffset="50%"
          text-anchor="middle"
          alignment-baseline="middle"
          xlink:href="#key-text-circle"
        >
          {key.name}
        </textPath>
      </text>
    </g>
  {/each}
</g>

<style>
  .key:not(.active) {
    cursor: pointer;
  }

  .key.active {
    cursor: default;
  }

  .key text {
    user-select: none;
  }

  .key.black path {
    fill: var(--color-black-key);
    stroke: var(--color-border);
  }

  .key.black text {
    fill: var(--color-white-key);
    font-size: 10px;
  }

  .key.white path {
    fill: var(--color-white-key);
    stroke: var(--color-border);
  }

  .key.white text {
    fill: var(--color-black-key);
    font-size: 14px;
    font-weight: 400;
  }

  .key:not(.active):hover path {
    fill: var(--color-hover);
  }

  .key:not(.active):hover text {
    fill: var(--color-black-key);
  }

  .key:not(.active):active path {
    fill: var(--color-active);
  }
</style>
