<template>
  <div class="option-group" :class="{red: required && showValidationStatus && (!modelValue || !modelValue.length)}">
    <label v-html="$t(text)"></label>

    <div class="options" :class="{horizontal: horizontal}">
      <div class="option" v-for="(option, key) in options" :key="key">
        <input
            :type="type"
            :value="option"
            :id="'option-' + option + key + text"
            v-model="answers"
        >
        <label :for="'option-' + option + key + text" v-html="$t(option)"></label>
      </div>
    </div>

    <div
        class="error-message"
        v-if="required && showValidationStatus && (!modelValue || !modelValue.length)"
    >{{ $t('thisFieldIsRequired') }}</div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed} from "vue"

  export default defineComponent({
    name: 'cOptionGroup',

    props: {
      text: String,
      options: Object,
      required: Boolean,
      horizontal: Boolean,
      type: {
        type: String,
        default: 'checkbox'
      },
      showValidationStatus: Boolean,
      modelValue: [Array, String]
    },

    emits: ['update:modelValue'],

    setup(props: any, context: any) {
      const answers = computed({
        get: () => props.modelValue,
        set: (newValue) => context.emit('update:modelValue', newValue)
      })

      return { answers }
    }
  })
</script>

<style lang="scss">
.option-group {
  margin-bottom: 28px;

  span {
    color: var(--color-midgrey);
  }

  .error-message {
    font-size: 0.75rem;
    color: var(--color-darkgrey);
    line-height: 0.75rem;
    margin-top: 16px;
  }

  &.red > label {
    color: var(--color-red);
  }

  .options {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    &.horizontal {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .option {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      cursor: pointer;

      input[type=radio] {
        margin-right: 12px;
        border: 1px solid var(--color-lightgrey);
        width: 32px;
        height: 32px;
        min-width: 32px;
        background: var(--color-white);
      }

      input[type=checkbox] {
        appearance: none;
        margin-right: 16px;
        border: 1px solid var(--color-darkgrey);
        width: 24px;
        height: 24px;
        min-width: 24px;
        background: var(--color-white);
        border-radius: var(--border-radius-mini);
        cursor: pointer;

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
    }
  }
}
</style>