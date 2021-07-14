<template>
  <a-stepper-step>
    <p>{{ $t('onlyTakesFourSimpleSteps') }}</p>

    <c-text-field
        :title="$t('insertEmail')"
        :placeholder="$t('insertEmailPlaceholder')"
        :required="true"
        key="agencyEmail"
        v-model="email"
        @validate="$emit('validate', $event)"
        :showValidationStatus="showValidationStatus"
        type="email"
    ></c-text-field>
  </a-stepper-step>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
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

  emits: ['validate'],

  setup() {
    const store = useStore()

    const email = computed({
      get: (): string => store.state.user.email,
      set: (value: string): void => store.commit('alterUser', { email: value })
    })

    return {
      email
    }
  }
}
</script>