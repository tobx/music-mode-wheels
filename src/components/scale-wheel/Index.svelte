<script lang="ts">
  import { controller, state, tempo } from "@/stores/sampler";

  import type { ModeDef } from "@/config/types";
  import ModeWheel from "./ModeWheel.svelte";
  import PianoWheel from "./PianoWheel.svelte";
  import PlayButton from "./PlayButton.svelte";
  import type { PlayButtonState } from "./types";
  import { onMount } from "svelte";

  export let modeDefs: ModeDef[];

  const notes = [
    "G2 Ab2 A2 Bb2 B2 C3 Db3 D3 Eb3 E3 F3 Gb3",
    "G3 Ab3 A3 Bb3 B3 C4 Db4 D4 Eb4 E4 F4 Gb4",
  ]
    .join(" ")
    .split(" ");

  const width = 256;
  const height = 256;
  const keyOuterRadius = (Math.min(width, height) * 3) / 8;
  const modeOuterRadius = (Math.min(width, height) * 15) / 32;

  let activeKey: string = "C";
  let activeModeIndex: number = 0;

  let isPlaying = false;
  let playButtonState: PlayButtonState;

  async function handlePlayButtonClick() {
    if ($state === "loaded") {
      controller.stop();
      if (!isPlaying) {
        playScale();
      }
    }
  }

  async function playScale() {
    const length = 60 / $tempo / 2;
    const rotated = [
      ...modeDefs.slice(activeModeIndex),
      ...modeDefs.slice(0, activeModeIndex),
    ];
    const offset = rotated[0].semitones;
    let semitones = rotated.map(
      ({ semitones }) => (semitones + 12 - offset) % 12
    );
    semitones = [...semitones, 12, ...semitones.reverse()];
    const keyIndex = notes.findIndex((note) => note.slice(0, -1) === activeKey);
    const pattern = semitones.map((semitones, i) => ({
      note: notes[keyIndex + semitones],
      delay: i === 0 ? 0 : length,
    }));
    isPlaying = true;
    await controller.play(pattern);
    isPlaying = false;
  }

  $: {
    playButtonState =
      $state !== "loaded" ? "loading" : isPlaying ? "playing" : "stopped";
  }

  onMount(() => {
    //
  });
</script>

<svg viewBox="0 0 {width} {height}">
  <g transform="translate({width / 2}, {height / 2})">
    <PlayButton
      radius={keyOuterRadius / 6}
      state={playButtonState}
      on:click={handlePlayButtonClick}
    />
    <g transform="rotate(-15)">
      <PianoWheel
        radius={keyOuterRadius}
        on:keyChanged={({ detail }) => (activeKey = detail)}
      />
      <ModeWheel
        outerRadius={modeOuterRadius}
        innerRadius={keyOuterRadius}
        {modeDefs}
        on:modeChanged={({ detail }) => (activeModeIndex = detail)}
      />
    </g>
  </g>
</svg>

<style>
  svg {
    --color-black-key: var(--color-text);
    --color-white-key: var(--white);

    stroke-width: 0.67;
    user-select: none;

    -webkit-tap-highlight-color: transparent;
  }

  svg :global(.wheel) {
    transition: transform 1s ease;
  }
</style>
