<script lang="ts">
  import PageContent from "./components/page/PageContent.svelte";
  import PageFooter from "./components/page/PageFooter.svelte";
  import PageHeader from "./components/page/PageHeader.svelte";
</script>

<div class="app">
  <PageHeader />
  <PageContent />
  <PageFooter />
</div>

<style>
  :global(body) {
    --primary: #13b685;
    --white: #fff;

    --gray-50: #fafafa;
    --gray-100: #f4f4f5;
    --gray-200: #e4e4e7;

    --gray-300: #d4d4d8;
    --gray-400: #a1a1aa;
    --gray-700: #3f3f46;

    --blue-400: #38bdf8;
    --blue-500: #0ea5e9;

    --green-400-rgb: 52, 211, 153;

    --red-500: #ef4444;
    --yellow-300: #fde047;

    --color-active: var(--red-500);
    --color-border: var(--gray-300);
    --color-border-disabled: var(--gray-200);
    --color-border-hover: var(--gray-400);
    --color-disabled: var(--gray-400);
    --color-hover: var(--yellow-300);
    --color-link: var(--blue-500);
    --color-primary: rgb(var(--green-400-rgb));
    --color-primary-outline: rgba(var(--green-400-rgb), 0.375);
    --color-text: var(--gray-700);

    background-color: var(--gray-100);
    color: var(--color-text);
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    margin: 0;
  }

  .app :global(a) {
    color: var(--color-link);
    text-decoration: none;
  }

  .app :global(a:hover) {
    text-decoration: underline;
    text-decoration-color: var(--color-text);
  }
</style>
