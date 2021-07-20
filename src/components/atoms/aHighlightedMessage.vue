<template>
  <div class="highlighted-message" :class="type">
    <p><slot></slot></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'aHighlightedMessage',

  props: {
    type: {
      type: String,
      default: 'info'
    }
  }
});
</script>

<style lang="scss" scoped>
  .highlighted-message {
    padding: 12px 16px;
    margin-bottom: 24px;
    border-radius: var(--border-radius-standard);
    color: var(--color-black);
    display: flex;
    align-items: center;
    background: var(--color-yellow);

    &:before {
      content: "\f06a";
      font-family: 'Line Awesome Free';
      font-size: 24px;
      font-weight: 900;
      margin-right: 12px;
      color: var(--color-black);
    }

    &.success {
      background: var(--color-green);

      &:before {
        color: var(--color-white);
      }
    }

    &.error {
      background: var(--color-red);

      &:before {
        color: var(--color-white);
      }
    }
  }
</style>