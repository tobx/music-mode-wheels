<script lang="ts">
  import ScaleWheel from "../mode-wheel/ScaleWheel.svelte";
  import PlaybackOptions from "../settings/PlaybackOptions.svelte";
  import { modeDefs } from "@/music/modes";

  const modes = [
    { name: "Melodic Major", defs: modeDefs.melodic.major },
    { name: "Melodic Minor", defs: modeDefs.melodic.minor },
    { name: "Harmonic Major", defs: modeDefs.harmonic.major },
    { name: "Harmonic Minor", defs: modeDefs.harmonic.minor },
  ];
</script>

<main>
  <h1>Music Mode Wheels</h1>
  <div>
    <h3>Playback Options</h3>
    <PlaybackOptions />
  </div>
  {#each modes as { name, defs: modeDefs }}
    <h2>{name} Modes</h2>
    <div class="wheel">
      <ScaleWheel {modeDefs} />
    </div>
  {/each}
</main>

<style>
  h1,
  h2,
  h3 {
    font-weight: inherit;
    line-height: 1;
  }

  h1 {
    border-bottom: 0.125em solid var(--color-primary);
    margin-bottom: 0.5em;
    margin-top: 0;
  }

  h2 {
    margin: 1.5em 0 0.75em 0;
  }

  h3 {
    font-size: 150%;
    font-weight: 300;
    margin: 2em 0 1em 0;
  }

  @media (min-width: 640px) {
    h1 {
      font-size: 400%;
    }
    h2 {
      font-size: 250%;
    }
  }

  main {
    background-color: var(--gray-50);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
  }

  @media (min-width: 640px) {
    main {
      padding: 1em 2em 4em 2em;
    }
  }

  /* https://webkit.org/blog/7929/designing-websites-for-iphone-x/ */
  @supports (padding: max(0px)) {
    main {
      padding-left: max(2em, env(safe-area-inset-left));
      padding-right: max(2em, env(safe-area-inset-right));
    }
  }

  .wheel {
    font-weight: 300;
    max-width: 512px;
    width: 100%;
  }

  @media (min-width: 1024px) {
    .wheel {
      max-width: 640px;
    }
  }
</style>
