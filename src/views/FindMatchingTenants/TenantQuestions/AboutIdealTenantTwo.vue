<template>
  <a-stepper-step>
    <div class="boxed-heading">{{ $t('aboutYourIdealTenant') }}</div>

    <c-option-group
        :required="true"
        :text="idealTenant[3].text"
        :options="idealTenant[3].options"
        :model-value="getAnswer(3)"
        @update:model-value="setAnswerAndValidate(3, $event)"
        :showValidationStatus="showValidationStatus"
        :horizontal="true"
        type="radio"
    ></c-option-group>

    <c-option-group
        :required="true"
        :text="idealTenant[4].text"
        :options="idealTenant[4].options"
        :model-value="getAnswer(4)"
        @update:model-value="setAnswerAndValidate(4, $event)"
        :showValidationStatus="showValidationStatus"
        :horizontal="true"
        type="radio"
    ></c-option-group>
  </a-stepper-step>
</template>

<script lang="ts">
import COptionGroup from "@/components/cells/cOptionGroup.vue"
import useIdealTenant from "@/modules/useIdealTenant"
import AStepperStep from "@/components/atoms/aStepperStep.vue"
import {onMounted} from "vue";

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
      context.emit('validate', idealTenant.value[3].answers && idealTenant.value[3].answers.length && idealTenant.value[4].answers && idealTenant.value[4].answers.length)
    }

    onMounted((): void => {
      context.emit('validate', idealTenant.value[3].answers && idealTenant.value[3].answers.length && idealTenant.value[4].answers && idealTenant.value[4].answers.length)
    })

    return { idealTenant, getAnswer, setAnswerAndValidate }
  }
}
</script>