<template>
  <div class="lds-ring" :class="{ big }"><div></div><div></div><div></div><div></div></div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'aLoadingSpinner',
  props: {
    big: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style lang="scss">
  :root {
    --loading-spinner-size: 24px;
    --loading-spinner-size-big: 36px;
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: calc(var(--loading-spinner-size) * 1.25);
    height: calc(var(--loading-spinner-size) * 1.25);

    div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: var(--loading-spinner-size);
      height: var(--loading-spinner-size);
      margin: calc(var(--loading-spinner-size) / 8);
      border: calc(var(--loading-spinner-size) / 8) solid var(--color-white);
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: var(--color-white) transparent transparent transparent;

      &:nth-child(1) {
        animation-delay: -0.45s;
      }

      &:nth-child(2) {
        animation-delay: -0.3s;
      }

      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }

    &.big {
      width: calc(var(--loading-spinner-size-big) * 1.25);
      height: calc(var(--loading-spinner-size-big) * 1.25);
      display: block;
      margin: 20vh auto;

      div {
        width: var(--loading-spinner-size-big);
        height: var(--loading-spinner-size-big);
        margin: calc(var(--loading-spinner-size-big) / 8);
        border: calc(var(--loading-spinner-size-big) / 8) solid var(--color-green);
        border-color: var(--color-green) transparent transparent transparent;
      }
    }
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>