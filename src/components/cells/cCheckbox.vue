<template>
  <div class="checkbox">
    <input
        type="checkbox"
        :id="'check-' + key"
        :checked="isChecked"
        :value="isChecked"
        @change="isChecked = !isChecked; $emit('update:modelValue', isChecked)"
    >
    <label :for="'check-' + key" :class="{red: required && showValidationStatus && !isChecked}">
      <slot></slot>
    </label>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref} from "vue";

  export default defineComponent({
    name: 'cCheckbox',
    props: {
      modelValue: Boolean,
      key: String,
      required: {
        type: Boolean,
        default: false
      },
      showValidationStatus: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:modelValue'],

    setup(props) {
      const isChecked = ref<boolean>(props.modelValue)

      return { isChecked }
    }
  })
</script>

<style lang="scss">
  .checkbox {
    display: flex;
    align-items: center;
    margin-top: 16px;

    input {
      appearance: none;
      margin-right: 8px;
      border: 1px solid var(--color-darkgrey);
      width: 24px;
      height: 24px;
      min-width: 24px;
      background: var(--color-white);
      border-radius: var(--border-radius-mini);
      cursor: pointer;

      @include desktop {
        margin-right: 16px;
      }

      &:hover {
         background: var(--color-lightgrey);
      }

      &:checked {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-lightgrey);

        &:before {
          content: "\f00c";
          font-family: 'Line Awesome Free';
          font-weight: 900;
          color: var(--color-green);
          font-size: 16px;
        }
      }
    }

    label {
      font-size: 0.75rem;
      font-weight: var(--font-weight-lighter);

      &.red {
        color: var(--color-red);
      }
    }
  }
</style>