<template>
  <a-stepper-step>
    <div class="boxed-heading">{{ $t('aboutNeighbourhood') }}</div>

    <c-option-group
        :required="true"
        :text="idealTenant[0].text"
        :options="idealTenant[0].options"
        :model-value="getAnswer(0)"
        @update:model-value="setAnswerAndValidate(0, $event)"
        :showValidationStatus="showValidationStatus"
        type="radio"
    ></c-option-group>
  </a-stepper-step>
</template>

<script lang="ts">
  import useIdealTenant from "@/modules/useIdealTenant"

  import COptionGroup from "@/components/cells/cOptionGroup.vue"
  import AStepperStep from "@/components/atoms/aStepperStep.vue"

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
        context.emit('validate', idealTenant.value[0].answers && idealTenant.value[0].answers.length)
      }

      return { idealTenant, getAnswer, setAnswerAndValidate }
    }
  }
</script>