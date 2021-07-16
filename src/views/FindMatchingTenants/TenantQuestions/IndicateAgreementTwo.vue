<template>
  <a-stepper-step>
    <div class="boxed-heading">{{ $t('pleaseIndicateHowMuchYouAgree') }}</div>

    <c-option-group
        :required="true"
        :text="idealTenant[6].text"
        :options="idealTenant[6].options"
        :model-value="getAnswer(6)"
        @update:model-value="setAnswerAndValidate(6, $event)"
        :showValidationStatus="showValidationStatus"
        type="radio"
    ></c-option-group>
  </a-stepper-step>
</template>

<script lang="ts">
import COptionGroup from "@/components/cells/cOptionGroup.vue"
import useIdealTenant from "@/modules/useIdealTenant"
import AStepperStep from "@/components/atoms/aStepperStep.vue";

export default {
  components: {AStepperStep, COptionGroup},

  props: {
    showValidationStatus: {
      type: Boolean,
      default: false
    }
  },

  emits: ['input', 'validate'],

  setup(_: any, context: any) {
    const { idealTenant, getAnswer, setAnswer } = useIdealTenant(context)

    function setAnswerAndValidate(key: number, event: any): void {
      setAnswer(key, event)
      context.emit('validate', idealTenant.value[6].answers && idealTenant.value[6].answers.length)
    }

    return { idealTenant, getAnswer, setAnswerAndValidate }
  }
}
</script>