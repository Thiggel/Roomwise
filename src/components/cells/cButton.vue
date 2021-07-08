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
    border-radius: 500px;
    cursor: pointer;
    transition: all 0.25s ease;

    &.secondary {
      background: var(--color-grey);
    }

    &:hover {
      opacity: 0.75;
    }
  }
</style>