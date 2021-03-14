<script lang="ts">
  import { circlePathDef, ringArcPathDef } from "@/utilities/svg";

  import { createEventDispatcher } from "svelte";

  export let radius: number;

  const dispatch = createEventDispatcher<{ keyChanged: string }>();

  export function pressKey(key: string) {
    pressedKeys[key] = true;
  }

  export function releaseKey(key: string) {
    pressedKeys[key] = false;
  }

  const blackKeyInnerRadius = (2 / 3) * radius;
  const whiteKeyInnerRadius = radius / 2;
  const keyTextRadius = (radius + blackKeyInnerRadius) / 2 - 1;

  class Key {
    public path: string;

    constructor(
      public type: "black" | "white",
      public name: string,
      public displayName: string,
      public rotation: number,
      public keyAngle: number = 30,
      public textAngle: number = 15
    ) {
      const innerRadius = this.isWhite
        ? whiteKeyInnerRadius
        : blackKeyInnerRadius;
      this.path = ringArcPathDef(radius, innerRadius, keyAngle);
    }

    get angle() {
      return 15 - this.rotation - this.textAngle;
    }

    get isWhite() {
      return this.type === "white";
    }
  }

  function selectKey(key: Key) {
    selectedKey = key;
    dispatch("keyChanged", key.name);
  }

  const keys = [
    new Key("white", "C", "C", 0, 45, 15),
    new Key("black", "Db", "C♯ / D♭", 30),
    new Key("white", "D", "D", 45, 60, 30),
    new Key("black", "Eb", "D♯ / E♭", 90),
    new Key("white", "E", "E", 105, 45, 30),
    new Key("white", "F", "F", 150, 45, 15),
    new Key("black", "Gb", "F♯ / G♭", 180),
    new Key("white", "G", "G", 195, 60, 30),
    new Key("black", "Ab", "G♯ / A♭", 240),
    new Key("white", "A", "A", 255, 60, 30),
    new Key("black", "Bb", "A♯ / B♭", 300),
    new Key("white", "B", "B", 315, 45, 30),
  ];

  const blackKeys = keys.filter((key) => !key.isWhite);

  const whiteKeys = keys.filter((key) => key.isWhite);

  const pressedKeys: { [key: string]: boolean } = {};

  let selectedKey = keys[0];

  let wheelRotation = 0;

  $: {
    const diff = selectedKey.angle - wheelRotation;
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
      class:pressed={pressedKeys[key.name] === true}
      class:selected={key === selectedKey}
      transform="rotate({key.rotation})"
      on:click={() => selectKey(key)}
    >
      <path d={key.path} transform="rotate(-90)" />
      <text dominant-baseline="middle" transform="rotate({key.textAngle})">
        <textPath
          startOffset="50%"
          text-anchor="middle"
          alignment-baseline="middle"
          xlink:href="#key-text-circle"
        >
          {key.displayName}
        </textPath>
      </text>
    </g>
  {/each}
</g>

<style>
  .key:not(.selected) {
    cursor: pointer;
  }

  .key.selected {
    cursor: default;
  }

  .key text {
    user-select: none;
  }

  .key.black path {
    fill: var(--color-key-black);
    stroke: var(--color-border);
  }

  .key.black text {
    fill: var(--color-key-white);
    font-size: 10px;
  }

  .key.white path {
    fill: var(--color-key-white);
    stroke: var(--color-border);
  }

  .key.white text {
    fill: var(--color-key-black);
    font-size: 14px;
    font-weight: 400;
  }

  .key:hover path {
    fill: var(--color-hover);
  }

  .key:hover text {
    fill: var(--color-key-black);
  }

  .key:active path {
    fill: var(--color-active);
  }

  .key.selected path {
    fill: var(--color-primary);
  }

  .key.selected text {
    fill: var(--color-key-white);
  }

  .key.pressed path {
    fill: var(--color-key-pressed);
  }

  .key.pressed text {
    fill: var(--color-key-white);
  }
</style>
