<template>
  <a-stepper-step>
    <div class="boxed-heading">{{ $t('pleaseIndicateHowMuchYouAgree') }}</div>

    <c-option-group
        :required="true"
        :text="idealTenant[5].text"
        :options="idealTenant[5].options"
        :model-value="getAnswer(5)"
        @update:model-value="setAnswerAndValidate(5, $event)"
        :showValidationStatus="showValidationStatus"
        type="radio"
    ></c-option-group>
  </a-stepper-step>
</template>

<script lang="ts">
import COptionGroup from "@/components/cells/cOptionGroup.vue"
import useIdealTenant from "@/modules/useIdealTenant"
import AStepperStep from "@/components/atoms/aStepperStep.vue";
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
      context.emit('validate', idealTenant.value[5].answers && idealTenant.value[5].answers.length)
    }

    onMounted((): void => {
      context.emit('validate', idealTenant.value[5].answers && idealTenant.value[5].answers.length)
    })

    return { idealTenant, getAnswer, setAnswerAndValidate }
  }
}
</script>