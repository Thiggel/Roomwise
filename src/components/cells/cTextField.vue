<template>
  <div class="input-wrapper" :class="{short: short, valid: validationStatus, textarea: type === 'textarea'}">
    <label :for="key">
      {{ title }}<i v-if="required" class="required">*</i>
    </label>

    <select
      class="text-field"
      :class="{placeholderRight: placeholderRight, red: showValidationStatus && !validationStatus, valid: validationStatus}"
      v-if="type === 'select'"
      :value="modelValue"
      @change="validate($event.target.value)"
      :name="key"
      :placeholder="placeholder"
      :required="required"
    >
      <option value="Amsterdam">Amsterdam</option>
      <option value="Groningen">Groningen</option>
      <option value="Den Haag">Den Haag</option>
      <option value="Enschede">Enschede</option>
      <option value="Leeuwarden">Leeuwarden</option>
      <option value="Maastricht">Maastricht</option>
      <option value="Nijmegen">Nijmegen</option>
      <option value="Rotterdam">Rotterdam</option>
      <option value="Utrecht">Utrecht</option>
      <option value="Zwolle">Zwolle</option>
    </select>
    <input
        class="text-field"
        :class="{placeholderRight: placeholderRight, red: showValidationStatus && !validationStatus, valid: validationStatus}"
        :value="modelValue"
        :name="key"
        :placeholder="placeholder"
        :required="required"
        :type="type === 'password' ? 'password' : 'text'"
        @input="validate($event.target.value)"
        v-if="type === 'textfield' || type === 'email' || type === 'password'"
    >
    <textarea
        class="text-field"
        :class="{placeholderRight: placeholderRight, red: showValidationStatus && !validationStatus }"
        :value="modelValue"
        :name="key"
        :placeholder="placeholder"
        :required="required"
        @input="validate($event.target.value)"
        v-if="type === 'textarea'"
    ></textarea>
    <a
        class="forgot-password"
        href="https://roomwise.nl/my-account/lost-password/"
        target="_blank"
        v-if="type === 'password'"
    >{{ $t('forgotPassword') }}</a>
    <span class="error-message" v-if="showValidationStatus && !validationStatus">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'cTextField',
  props: {
    modelValue: String,
    key: String,
    title: String,
    placeholder: String,
    required: Boolean,
    short: Boolean,
    placeholderRight: Boolean,
    showValidationStatus: Boolean,
    regexp: {
      type: String,
      default: '^[A-Za-z \\-]+$'
    },
    type: {
      type: String,
      default: 'textfield'
    }
  },

  emits: ['update:modelValue', 'validate'],

  setup(props: any, context: any) {
    const { t } = useI18n()

    const errorMessage = ref<string>(t('thisFieldIsRequired'))
    const validationStatus = ref<boolean>(false)

    interface fieldValidationStatus {
      status: boolean,
      message: string
    }

    function validateRequired(value: any): fieldValidationStatus {
      if(props.required && !value?.length) {
        return {
          status: false,
          message: t('thisFieldIsRequired')
        }
      }

      return {
        status: true,
        message: ''
      }
    }

    function validateRegexp(value: any): fieldValidationStatus {

      let regexp = new RegExp(props.regexp)

      if(props.type === 'email')
        // eslint-disable-next-line no-control-regex
        regexp = /^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

      if(!regexp.test(value)) {
        return {
          status: false,
          message: t('noValidValue')
        }
      }

      return {
        status: true,
        message: ''
      }
    }

    function validate(value: any) {
      const required: fieldValidationStatus = validateRequired(value)
      const regexp: fieldValidationStatus = validateRegexp(value)

      if(!required.status || !regexp.status) {
        validationStatus.value = false
        errorMessage.value = required.message === '' ? regexp.message : required.message
      } else {
        validationStatus.value = true
        errorMessage.value = ''
      }

      context.emit('validate', validationStatus.value)
      context.emit('update:modelValue', value)
    }

    onMounted((): void => {
      validate(props.modelValue)
    })

    return { validate, validationStatus, errorMessage }
  }
});
</script>

<style lang="scss" scoped>
  .input-wrapper {
    width: 100%;
    margin-bottom: 20px;

    &.short {
      max-width: 35%;
    }

    label {
      .required {
        color: var(--color-red);
      }
    }

    .forgot-password {
      font-size: 0.75rem;
      color: var(--color-black);
    }

    span.error-message {
      font-size: 0.75rem;
      color: var(--color-darkgrey);
      line-height: 0.75rem;
    }

    textarea.text-field {
      height: 120px;
    }

    .text-field {
      border: 1px solid var(--color-lightgrey);
      border-radius: var(--border-radius-standard);
      font-size: 1rem;
      padding: 20px;
      background: var(--color-white);
      margin: 12px 0;
      width: calc(100% - 42px);
      font-weight: var(--font-weight-light);
      font-family: var(--font-primary);
      font-weight: var(--font-weight-light);
      color: var(--color-black);
      resize: none;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;

      &:focus {
        box-shadow: unset;
        outline: none;
      }

      &::placeholder {
        color: var(--color-lightgrey);
        font-size: 1rem;
        font-family: var(--font-primary);
        font-weight: var(--font-weight-light);
      }

      &.placeholderRight::placeholder {
        text-align: right;
      }

      &.red {
        border: 1px solid var(--color-red);
      }
    }

    select.text-field {
      width: 100%;
    }

    &:after {
      content: "\f00c";
      font-family: 'Line Awesome Free';
      font-weight: 900;
      color: var(--color-green);
      font-size: 32px;
      position: absolute;
      right: 24px;
      bottom: 30px;
      visibility: hidden;
      z-index: -1;
    }

    &.valid {
      position: relative;

      .text-field {
        padding-right: 64px;
        width: calc(100% - 86px);
      }

      select.text-field {
        width: 100%;
      }

      &:after {
        visibility: visible;
        z-index: 1;
      }

      &.textarea:after {
        bottom: 80px;
      }
    }
  }
</style>