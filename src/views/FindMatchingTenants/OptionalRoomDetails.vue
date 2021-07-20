<template>
  <a-stepper-step>
    <div class="stepper-row">
      <c-text-field
          :title="$t('extraCosts')"
          placeholder="€"
          :placeholderRight="true"
          key="propertyExtraCosts"
          v-model="propertyExtraCosts"
          @update:model-value="$emit('input')"
          @validate="validate($event, 'propertyExtraCosts')"
          :showValidationStatus="showValidationStatus"
          regexp="^[€]?[ ]?\d{1,5}(?:[.,]\d{3})*(?:[.,]\d{2})?[ ]?[€]?$"
      ></c-text-field>

      <c-text-field
          :title="$t('deposit')"
          placeholder="€"
          :placeholderRight="true"
          key="propertyDeposit"
          v-model="propertyDeposit"
          @update:model-value="$emit('input')"
          @validate="validate($event, 'propertyDeposit')"
          :showValidationStatus="showValidationStatus"
          regexp="^[€]?[ ]?\d{1,5}(?:[.,]\d{3})*(?:[.,]\d{2})?[ ]?[€]?$"
      ></c-text-field>
    </div>

    <c-text-field
        :title="$t('describeTheProperty')"
        type="textarea"
        key="propertyDescription"
        v-model="propertyDescription"
        @update:model-value="$emit('input')"
        @validate="validate($event, 'propertyDescription')"
        :showValidationStatus="showValidationStatus"
        regexp="\w+"
    ></c-text-field>
  </a-stepper-step>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import {computed, reactive} from 'vue'
import CTextField from "@/components/cells/cTextField.vue";
import AStepperStep from "@/components/atoms/aStepperStep.vue";


export default {
  components: {AStepperStep, CTextField},

  props: {
    showValidationStatus: {
      type: Boolean,
      default: false
    }
  },

  emits: ['input', 'validate'],

  setup(_: any, context: any) {
    const store = useStore()

    const propertyExtraCosts = computed({
      get: (): string => store.state.user.property.extraCosts,
      set: (value: string): void => store.commit('alterProperty', { extraCosts: value })
    })

    const propertyDeposit = computed({
      get: (): string => store.state.user.property.deposit,
      set: (value: string): void => store.commit('alterProperty', { deposit: value })
    })

    const propertyDescription = computed({
      get: (): string => store.state.user.property.description,
      set: (value: string): void => store.commit('alterProperty', { description: value })
    })

    const validationStatus: any = reactive<object>({
      propertyExtraCosts: false,
      propertyDeposit: false,
      propertyDescription: false
    })

    function validate(event: any, key: string) {
      validationStatus[key] = event
      context.emit('validate', Object.values(validationStatus).every(item => item))
    }

    return { propertyExtraCosts, propertyDeposit, propertyDescription, validationStatus, validate }
  }
}
</script>