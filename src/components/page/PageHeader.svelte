<header>
  <div class="flex-1">
    <a href="https://github.com/tobx/music-mode-wheels" class="icon">
      <svg viewBox="0 0 64 64" fill="currentColor">
        <path
          d="M31.997,-0C14.327,-0 0,14.327 0,32.001C0,46.139 9.168,58.132 21.884,62.366C23.485,62.658 24.069,61.67 24.069,60.822C24.069,60.063 24.041,58.05 24.025,55.38C15.124,57.313 13.246,51.09 13.246,51.09C11.791,47.394 9.693,46.41 9.693,46.41C6.787,44.424 9.913,44.463 9.913,44.463C13.125,44.691 14.814,47.762 14.814,47.762C17.668,52.651 22.304,51.239 24.127,50.422C24.418,48.353 25.243,46.943 26.159,46.143C19.053,45.336 11.582,42.589 11.582,30.327C11.582,26.834 12.83,23.978 14.877,21.741C14.547,20.931 13.449,17.678 15.189,13.272C15.189,13.272 17.877,12.411 23.99,16.553C26.542,15.843 29.28,15.488 32.001,15.476C34.718,15.488 37.456,15.843 40.012,16.553C46.121,12.411 48.803,13.272 48.803,13.272C50.549,17.678 49.451,20.931 49.121,21.741C51.172,23.978 52.412,26.834 52.412,30.327C52.412,42.621 44.929,45.326 37.8,46.118C38.949,47.106 39.973,49.058 39.973,52.044C39.973,56.321 39.933,59.772 39.933,60.822C39.933,61.678 40.509,62.674 42.134,62.362C54.84,58.12 64,46.135 64,32.001C64,14.327 49.671,-0 31.997,-0"
        />
      </svg>
    </a>
  </div>
  <div class="center">
    <strong>No sound?</strong>
    <span>Check if your device is silenced.</span>
  </div>
  <div class="flex-1" />
</header>

<style>
  header {
    align-items: center;
    background-color: var(--white);
    border-bottom: calc(1em / 16) solid var(--gray-200);
    display: flex;
    padding: 1em;
  }

  strong {
    font-weight: 600;
  }

  .icon {
    color: var(--color-text-dimmed);
    display: block;
    width: 1.5em;
    height: 1.5em;
  }

  .icon:hover {
    color: var(--color-text);
  }

  .flex-1 {
    flex: 1;
  }

  .center {
    --margin: 0.375em;
    color: var(--color-text-dimmed);
    display: flex;
    flex-wrap: wrap;
    margin: 0 calc(-1 * var(--margin));
    padding: 0 1em;
    white-space: nowrap;
  }

  .center > * {
    margin: 0 var(--margin);
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
</style>
