<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import {defineComponent} from "vue";

  export default defineComponent({
    name: 'cButton'
  });
</script>

<style lang="scss" scoped>
  button.button,
  a.button {
    background: var(--color-green);
    font-family: var(--font-primary);
    border: transparent;
    font-size: 0.75rem;
    color: var(--color-white);
    padding: 0.75rem 2rem;
    border-radius: var(--infinite);
    cursor: pointer;
    transition: all 0.25s ease;

    &.disabled {
      filter: grayscale(1);
      cursor: not-allowed;
    }

    &.big {
      border-radius: var(--border-radius-standard);
      font-size: 1rem;
      display: block;
      width: 100%;
    }

    &.text-icon {
      font-size: 2rem;
      padding: 0.25rem 2rem;
    }

    &.secondary {
      background: var(--color-grey);
    }

    &.black-font {
      color: var(--color-black);
    }

    &.link {
      color: var(--color-black);
      text-decoration: underline;
      background: transparent;
      margin: 0 auto;
      display: block;
      font-size: 1rem;
      margin-bottom: 28px;
    }

    &:not(.disabled):hover {
      opacity: 0.75;
    }
  }
</style>