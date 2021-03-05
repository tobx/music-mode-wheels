<script lang="ts">
  import { modeDefs } from "@/music/modes";
  import ScaleWheel from "./components/ScaleWheel.svelte";

  const modes = [
    { name: "Melodic Major", defs: modeDefs.melodic.major },
    { name: "Melodic Minor", defs: modeDefs.melodic.minor },
    { name: "Harmonic Major", defs: modeDefs.harmonic.major },
    { name: "Harmonic Minor", defs: modeDefs.harmonic.minor },
  ];
</script>

<div class="app">
  <header>
    <a href="https://github.com/tobx/music-mode-wheels" class="icon">
      <svg viewBox="0 0 136 133" fill="currentColor">
        <path
          d="M67.867,0C30.388,0 0,30.387 0,67.875C0,97.863 19.446,123.3 46.417,132.279C49.813,132.9 51.05,130.804 51.05,129.004C51.05,127.396 50.992,123.125 50.958,117.463C32.079,121.563 28.096,108.363 28.096,108.363C25.008,100.525 20.558,98.438 20.558,98.438C14.396,94.225 21.025,94.308 21.025,94.308C27.838,94.792 31.421,101.304 31.421,101.304C37.475,111.675 47.308,108.679 51.175,106.946C51.792,102.558 53.542,99.567 55.483,97.871C40.413,96.158 24.567,90.333 24.567,64.325C24.567,56.917 27.213,50.858 31.554,46.112C30.854,44.396 28.525,37.496 32.217,28.15C32.217,28.15 37.917,26.325 50.883,35.108C56.296,33.604 62.104,32.85 67.875,32.825C73.638,32.85 79.446,33.604 84.867,35.108C97.825,26.325 103.513,28.15 103.513,28.15C107.217,37.496 104.888,44.396 104.188,46.112C108.538,50.858 111.167,56.917 111.167,64.325C111.167,90.4 95.296,96.138 80.175,97.817C82.613,99.912 84.783,104.054 84.783,110.387C84.783,119.458 84.7,126.779 84.7,129.004C84.7,130.821 85.921,132.933 89.367,132.271C116.317,123.275 135.746,97.854 135.746,67.875C135.746,30.387 105.354,0 67.867,0"
        />
      </svg>
    </a>
  </header>
  <main>
    <h1>Music Mode Wheels</h1>
    {#each modes as { name, defs: modeDefs }}
      <h2>{name} Modes</h2>
      <div class="wheel">
        <ScaleWheel {modeDefs} />
      </div>
    {/each}
  </main>
  <footer>
    <p>
      Made with <span class="red">♥</span> by
      <a href="https://www.tobx.de/">Tobx</a>
    </p>
  </footer>
</div>

<style>
  :global(body) {
    --primary: #13b685;
    --white: #fff;

    --gray-50: #fafafa;
    --gray-100: #f4f4f5;
    --gray-300: #d4d4d8;
    --gray-400: #a1a1aa;
    --gray-700: #3f3f46;

    --blue-400: #38bdf8;
    --blue-500: #0ea5e9;

    --green-400: #34d399;
    --red-500: #ef4444;
    --yellow-300: #fde047;

    --color-active: var(--red-500);
    --color-border: var(--gray-300);
    --color-hover: var(--yellow-300);
    --color-link: var(--blue-500);
    --color-text: var(--gray-700);

    background-color: var(--gray-100);
    color: var(--color-text);
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    margin: 0;
  }

  header {
    background-color: var(--gray-50);
    padding: 1em;
  }

  header .icon {
    color: var(--gray-400);
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
  }
  header .icon:hover {
    color: var(--color-text);
  }

  @media (min-width: 640px) {
    header .icon {
      width: 2em;
      height: 2em;
    }
  }

  /* https://webkit.org/blog/7929/designing-websites-for-iphone-x/ */
  @supports (padding: max(0px)) {
    header {
      padding-left: max(1em, env(safe-area-inset-left));
      padding-right: max(1em, env(safe-area-inset-right));
    }
  }

  main {
    background-color: var(--gray-50);
    display: flex;
    text-align: center;
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

  a {
    color: var(--color-link);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    text-decoration-color: var(--color-text);
  }

  h1,
  h2 {
    font-weight: inherit;
    line-height: 1;
  }

  h1 {
    border-bottom: 0.125em solid var(--green-400);
    margin: 0;
  }

  h2 {
    margin: 1.5em 0 0.75em 0;
  }

  @media (min-width: 640px) {
    h1 {
      font-size: 400%;
    }
    h2 {
      font-size: 250%;
    }
  }

  .red {
    color: var(--red-500);
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

  footer {
    border-top: 1px solid var(--color-border);
    padding: 1em;
    text-align: center;
  }
</style>
