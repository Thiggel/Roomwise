<template>
  <a-stepper-step>
    <p>{{ $t('whosYourIdealTenant') }}</p>
    <c-radio-group
      v-for="(question, key) in idealTenant.questions"
      :options="idealTenant.options"
      :title="question.message"
      :key="'question' + key"
      :required="true"
      :model-value="getQuestionValue(key)"
      @update:modelValue="setQuestionValue(key, $event)"
      :showValidationStatus="showValidationStatus"
    ></c-radio-group>
  </a-stepper-step>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { ref } from 'vue'
import AStepperStep from "@/components/atoms/aStepperStep.vue";
import CRadioGroup from "@/components/cells/cRadioGroup.vue";


export default {
  components: {CRadioGroup, AStepperStep},

  props: {
    showValidationStatus: {
      type: Boolean,
      default: false
    }
  },

  emits: ['input', 'validate'],

  setup(_: any, context: any) {
    const store = useStore()

    const idealTenant = ref<any>(store.state.user.property.idealTenant)

    function getQuestionValue(key: number): string {
      return store.state.user.property.idealTenant.questions[key].value
    }

    function setQuestionValue(key: number, value: string): void {
      store.commit('alterIdealTenant', {[key]: value})

      context.emit('validate', idealTenant.value.questions.every((item: any) => item.value.length))

      context.emit('input')
    }

    return { idealTenant, getQuestionValue, setQuestionValue }
  }
}
</script>