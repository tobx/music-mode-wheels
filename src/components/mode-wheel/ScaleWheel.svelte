<script context="module" lang="ts">
  import { Sampler } from "@/music/sampler";
  import type { Writable } from "svelte/store";
  import { writable } from "svelte/store";

  let sampler: Sampler;
  const samplerState: Writable<"initial" | "loading" | "loaded"> = writable(
    "initial"
  );

  const notes = [
    "G2 Ab2 A2 Bb2 B2 C3 Db3 D3 Eb3 E3 F3 Gb3",
    "G3 Ab3 A3 Bb3 B3 C4 Db4 D4 Eb4 E4 F4 Gb4",
  ]
    .join(" ")
    .split(" ");
</script>

<script lang="ts">
  import { Library } from "@/music/library";
  import MelodicMajorModeWheel from "./MelodicMajorModeWheel.svelte";
  import type { ModeDef } from "@/music/modes";
  import PianoWheel from "./PianoWheel.svelte";
  import PlayButton from "./PlayButton.svelte";
  import type { PlayButtonState } from "./types";
  import { config } from "@/config";
  import { onMount } from "svelte";

  export let modeDefs: ModeDef[];

  const width = 256;
  const height = 256;
  const keyOuterRadius = (Math.min(width, height) * 3) / 8;
  const modeOuterRadius = (Math.min(width, height) * 15) / 32;

  let activeKey: string = "C";
  let activeModeIndex: number = 0;

  let isPlaying = false;
  let playButtonState: PlayButtonState;

  async function handlePlayButtonClick() {
    if (samplerIsLoading) {
      return;
    }
    sampler.stop();
    if (!isPlaying) {
      playScale();
    }
  }

  async function loadInstrument() {
    const library = await Library.load(config.instruments.libraryUrl);
    const sampler = new Sampler(library);
    await sampler.load(config.instruments.default);
    return sampler;
  }

  async function playScale() {
    const length = 0.25;
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
    await sampler.playPattern(pattern);
    isPlaying = false;
  }

  $: samplerIsLoading = $samplerState !== "loaded";

  $: {
    playButtonState = samplerIsLoading
      ? "loading"
      : isPlaying
      ? "playing"
      : "stopped";
  }

  onMount(async () => {
    if ($samplerState === "initial") {
      samplerState.set("loading");
      sampler = await loadInstrument();
      samplerState.set("loaded");
    }
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
      <MelodicMajorModeWheel
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
