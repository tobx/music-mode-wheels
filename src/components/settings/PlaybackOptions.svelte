<script lang="ts">
  import RadioGroup from "../form/RadioGroup.svelte";

  const instrumentOptions = [
    { value: "piano", label: "Piano" },
    { value: "vibraphone", label: "Vibraphone" },
  ];

  const tempoOptions = [
    { value: "60", label: "60 BPM" },
    { value: "120", label: "120 BPM" },
  ];

  let instrument = "piano";
  let tempo = "120";

  $: {
    console.log(instrument);
  }

  $: {
    console.log(tempo);
  }
</script>

<div class="options">
  <div class="group">
    <p class="name">Instruments:</p>
    <RadioGroup bind:group={instrument} options={instrumentOptions} />
  </div>
  <div class="group">
    <p class="name">Tempo:</p>
    <RadioGroup bind:group={tempo} options={tempoOptions} />
  </div>
</div>

<style>
  .options {
    display: flex;
    flex-wrap: wrap;
    flex-flow: row wrap;
    margin: -0.5em;
    margin-bottom: 1em;
    justify-content: center;
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
