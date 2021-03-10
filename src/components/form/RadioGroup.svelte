<script lang="ts">
  import type { RadioGroupOption } from "./types";

  export let group: string;

  export let options: RadioGroupOption[] = [];
</script>

<div class="group">
  {#each options as { label, value }}
    <label>
      <input
        type="radio"
        bind:group
        {value}
        on:click={(event) => event.currentTarget.focus()}
      />
      {label}
    </label>
  {/each}
</div>

<style>
  .group {
    display: flex;
    flex-direction: column;
    padding: 0.25em 0;
  }

  label {
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    margin: 0.25em 0;
  }

  input {
    appearance: none;
    background-color: var(--white);
    border: calc(1em / 16) solid var(--color-border);
    border-radius: 1em;
    box-shadow: 0 0 0 0 var(--color-primary-outline);
    box-sizing: border-box;
    cursor: inherit;
    font-size: inherit;
    margin: 0;
    margin-right: 0.5em;
    outline: 0;
    width: 1em;
    height: 1em;
  }

  input:hover {
    border-color: var(--color-border-hover);
  }

  input:focus {
    box-shadow: 0 0 0 calc(1em * 3 / 16) var(--color-primary-outline);
  }

  input:checked {
    border: calc(1em / 3) solid var(--color-primary);
  }
</style>
