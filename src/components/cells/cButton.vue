<template>
  <a class="button" :href="to" :class="{loading: loading}" v-if="type === 'link'">
    <a-loading-spinner v-if="loading"></a-loading-spinner>
    <slot v-else></slot>
  </a>
  <button class="button" :class="{loading: loading}" v-else>
    <a-loading-spinner v-if="loading"></a-loading-spinner>
    <slot v-else></slot>
  </button>
</template>

<script lang="ts">
  import {defineComponent} from "vue"
  import ALoadingSpinner from "@/components/atoms/aLoadingSpinner.vue"

  export default defineComponent({
    name: 'cButton',
    components: {ALoadingSpinner},
    props: {
      type: {
        type: String,
        default: 'button'
      },

      to: {
        type: String,
        default: ''
      },

      loading: {
        type: Boolean,
        default: false
      }
    }
  })
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
    text-decoration: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 55px;

    &.disabled {
      filter: grayscale(1);
      cursor: not-allowed;
    }

    &.loading {
      padding: calc(0.75rem - 5px) 2rem;
    }

    &.big {
      border-radius: var(--border-radius-standard);
      font-size: 1rem;
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

    @include desktop {
      &:not(.disabled):hover {
        opacity: 0.75;
      }
    }
  }
</style>