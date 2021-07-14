<template>
  <div class="radio-group" :class="{red: required && showValidationStatus && !modelValue.length}">
    <label>
      {{ title }}<i v-if="required" class="required">*</i>
    </label>
    <div class="options">
      <div class="option" v-for="(option, key) in options" :key="key">
        <input
            type="radio"
            :value="option"
            :checked="modelValue === option"
            :id="'option-' + option + key"
            :name="title"
            @change="$emit('update:modelValue', $event.target.value)"
          >
        <label :for="'option-' + option + key">{{ $t(option) }}</label>
      </div>
    </div>

    <div
        class="error-message"
        v-if="required && showValidationStatus && !modelValue.length"
    >{{ $t('thisFieldIsRequired') }}</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'cRadioGroup',

  props: {
    modelValue: String,
    title: String,
    required: Boolean,
    options: Array,
    showValidationStatus: Boolean
  },

  emits: ['update:modelValue'],
});
</script>

<style lang="scss">
  .radio-group {
    margin-bottom: 28px;

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
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;

      .option {
        display: flex;
        align-items: center;

        input {
          margin-right: 12px;
          border: 1px solid var(--color-lightgrey);
          width: 32px;
          height: 32px;
          background: var(--color-white);
        }
      }
    }
  }
</style>