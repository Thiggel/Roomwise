<template>
  <div class="stepper-header">
    <div
        class="step-item"
        :class="{active: currentStep >= step.key}"
        v-for="(step, key) in visibleSteps"
        :key="key"
    >
      <div class="step-item-content">
        <div class="step-circle">{{ key+1 }}</div>
        <div class="step-title">{{ $t(step.intlName) }}</div>
      </div>

      <div class="step-line"></div>
      <div class="step-line green"></div>
    </div>

  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, computed } from "vue";

  export default defineComponent({
    name: 'StepperHeader',

    props: {
      steps: Object,
      modelValue: Number
    },

    emits: [ 'update:modelValue' ],

    setup(props: any, context: any): Object {
      let currentStep = ref<number>(props.modelValue)

      watch((): any => props.modelValue, (newValue: number): void => {
        currentStep.value = newValue
      })

      watch(currentStep, (newStep: number): void => {
        context.emit('update:modelValue', newStep)
      })

      const visibleSteps = computed((): Object => props.steps.filter((step: any): boolean => !step.hideInMenu))

      return { currentStep, visibleSteps }
    }

  });
</script>

<style lang="scss">
  .stepper-header {
    margin: 20px;
    padding: 16px;
    box-shadow: var(--shadow-primary);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: nowrap;
    border-radius: var(--border-radius-standard);
    background: var(--color-white);

    @include desktop {
      background: transparent;
      box-shadow: unset;
    }

    .step-item {
      width: 100%;
      position: relative;

      .step-item-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .step-circle {
          background: var(--color-white);
          border: 1px solid var(--color-green);
          font-family: var(--font-primary);
          font-size: 0.75rem;
          font-weight: var(--font-weight-light);
          color: var(--color-green);
          z-index: 2;
          padding: 0.5rem;
          border-radius: 50%;
          min-width: 30px;
          min-height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          transition: all 0.35s ease;
        }

        .step-title {
          font-size: 0.75rem;
          text-align: center;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .step-line {
        border-top: 1px solid var(--color-lightgrey);
        height: 1px;
        width: 100%;
        z-index: 1;
        position: absolute;
        top: 28px;
        left: -50%;

        &.green {
          border-color: var(--color-green);
          width: 0%;
          transition: all 0.35s ease;
        }
      }

      &:first-child {
        .step-line {
          display: none;
        }
      }

      &.active {
        .step-circle {
          background: var(--color-green);
          color: var(--color-white);
        }

        .step-line {
          &.green {
            width: 100%;
          }
        }
      }
    }
  }
</style>