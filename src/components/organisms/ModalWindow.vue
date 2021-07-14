<template>
  <div class="modal-window">
    <div class="modal-content">
      <div class="close-modal" @click="$emit('close')"></div>

      <slot></slot>
    </div>

    <div class="overlay" @click="$emit('close')"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'ModalWindow',
  emits: ['close']
});
</script>

<style lang="scss">
  .modal-window {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    padding: 40px;
    overflow-y: scroll;

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.15);
      z-index: 0;
    }

    .modal-content {
      position: relative;
      max-width: 900px;
      background: var(--color-white);
      border-radius: var(--border-radius-standard);
      padding: 40px;
      z-index: 1;
      margin: 100px auto 0;

      .close-modal {
        width: 48px;
        height: 48px;
        background: var(--color-green);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
        top: -60px;
        transition: all 0.25s ease;
        cursor: pointer;

        &:hover {
          opacity: 0.75;
        }

        &:before {
          content: "\f00d";
          font-family: 'Line Awesome Free';
          font-weight: 900;
          color: var(--color-white);
          font-size: 24px;
        }
      }
    }
  }
</style>