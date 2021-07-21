<template>
  <a-stepper-step>
    <div class="boxed-heading">{{ $t('aboutYourIdealTenant') }}</div>

    <c-option-group
        :required="true"
        :text="idealTenant[2].text"
        :options="idealTenant[2].options"
        :model-value="getAnswer(2)"
        @update:model-value="setAnswerAndValidate(2, $event)"
        :showValidationStatus="showValidationStatus"
        type="checkbox"
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
      context.emit('validate', idealTenant.value[2].answers && idealTenant.value[2].answers.length)
    }

    onMounted((): void => {
      context.emit('validate', idealTenant.value[2].answers && idealTenant.value[2].answers.length)
    })

    return { idealTenant, getAnswer, setAnswerAndValidate }
  }
}
</script>