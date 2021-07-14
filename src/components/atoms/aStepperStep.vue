<template>
  <div class="stepper-step">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  .stepper-step {
    p {
      text-align: center;
      margin: 20px 28px 40px;
      line-height: 1.5rem;

      @include desktop {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: var(--font-weight-lighter);
        margin: 0 0 80px;
      }

      .lar.la-check-circle {
        font-size: 50px;
        margin-bottom: 16px;
        color: var(--color-green);
      }
    }

    .stepper-row {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      align-items: flex-start;

      div:not(:last-child) {
        margin-right: 12px;
      }
    }
  }
</style>