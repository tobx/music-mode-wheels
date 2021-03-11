<script lang="ts">
  import RadioGroup from "../form/RadioGroup.svelte";
  import { library, instrumentId, tempo } from "@/stores/sampler";

  const instrumentOptions = library.instruments.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  $: tempoOptions = (() => {
    const tempoArrays = library.instruments.map(({ tempi }) => tempi);
    const tempi = ([] as number[]).concat(...tempoArrays);
    return [...new Set(tempi)].map((tempo) => ({
      value: tempo,
      label: tempo + " BPM",
      disabled: !library.hasPreset({ id: $instrumentId, tempo }),
    }));
  })();
</script>

<div class="options">
  <div class="group">
    <p class="name">Instrument:</p>
    <RadioGroup bind:group={$instrumentId} options={instrumentOptions} />
  </div>
  <div class="group">
    <p class="name">Tempo:</p>
    <RadioGroup bind:group={$tempo} options={tempoOptions} />
  </div>
</div>

<style>
  .options {
    display: flex;
    flex-wrap: wrap;
    flex-flow: row wrap;
    justify-content: center;
    margin: -0.5em;
    margin-bottom: 1em;
  }

  .group {
    align-self: flex-start;
    background: var(--white);
    border: calc(1em / 16) solid var(--gray-200);
    border-radius: 0.25em;
    margin: 0.5em;
    padding: 0.75em 1em 0.375em 1em;
  }

  .group .name {
    color: var(--gray);
    margin: 0.125em 0 0.25em 0;
  }
</style>
