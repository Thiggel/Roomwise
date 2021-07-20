<template>
  <div class="header">
    <img alt="Roomwise logo" class="normal" src="../../assets/logo.png">
    <img alt="Roomwise logo" class="tiny" src="../../assets/logo-small.png">

    <div class="options">
      <c-locale-changer></c-locale-changer>

      <c-button type="link" to="https://www.roomwise.nl/">{{ $t('quit') }}</c-button>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from "vue"
  import CButton from "@/components/cells/cButton.vue"
  import CLocaleChanger from "@/components/cells/cLocaleChanger.vue"

  export default defineComponent({
    name: 'MinimalHeader',
    components: {CLocaleChanger, CButton}
  })
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 12px 24px;
    border-bottom: 1px solid var(--color-lightgrey);
    background: var(--color-white);

    img {
      max-height: 36px;
      max-width: 50%;

      &.normal {
        display: none;
      }

      @include small-mobile {
        &.tiny {
          display: none;
        }

        &.normal {
          display: block;
        }
      }
    }

    .options {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .locale-changer {
        margin-right: 12px;
      }
    }
  }
</style>