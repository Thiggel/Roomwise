<template>
  <a-stepper-step>
    <p>{{ $t('onlyTakesFourSimpleSteps') }}</p>

    <c-button
      class="link"
      @click="showPasswordField = false"
      v-if="showPasswordField"
    >{{ $t('useDifferentEmail') }}</c-button>

    <c-text-field
        :title="$t('insertEmail')"
        :placeholder="$t('insertEmailPlaceholder')"
        :required="true"
        key="agencyEmail"
        v-model="agencyEmail"
        @validate="validate($event, 'agencyEmail')"
        :showValidationStatus="showValidationStatus"
        type="email"
    ></c-text-field>

    <c-text-field
        :title="$t('insertPassword')"
        :required="true"
        key="agencyPassword"
        v-model="agencyPassword"
        @validate="validate($event, 'agencyPassword')"
        :showValidationStatus="showValidationStatus"
        type="password"
        v-if="showPasswordField"
        regexp=".*"
    ></c-text-field>

    <c-checkbox
        v-model="acceptedDataDeclaration"
        :required="true"
        @update:model-value="validate"
        :showValidationStatus="showValidationStatus">
      <span v-html="$t('acceptDataDeclaration')"></span>
    </c-checkbox>
  </a-stepper-step>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import {computed, reactive, ref} from 'vue'
import CTextField from "@/components/cells/cTextField.vue";
import AStepperStep from "@/components/atoms/aStepperStep.vue";
import CButton from "@/components/cells/cButton.vue";
import CCheckbox from "@/components/cells/cCheckbox.vue";


export default {
  components: {CCheckbox, CButton, AStepperStep, CTextField},

  props: {
    showValidationStatus: {
      type: Boolean,
      default: false
    }
  },

  emits: ['validate'],

  setup(_: any, context: any) {
    const store = useStore()

    const showPasswordField = computed({
      get: (): boolean => store.state.findMatchingTenants.showPasswordField,
      set: (newValue: boolean): void => store.commit('togglePasswordField', newValue)
    })

    const agencyEmail = computed({
      get: (): string => store.state.user.email,
      set: (value: string): void => store.commit('alterUser', { email: value })
    })

    const agencyPassword = computed({
      get: (): string => store.state.user.password,
      set: (value: string): void => store.commit('alterUser', { password: value })
    })

    const acceptedDataDeclaration = ref<boolean>(false);

    const validationStatus: any = reactive<object>({
      agencyEmail: false,
      agencyPassword: false
    })

    function validate(event: any, key: string) {
      validationStatus[key] = event

      let status = validationStatus.agencyEmail

      if(showPasswordField.value) {
        status = Object.values(validationStatus).every(item => item)
      }

      status = status && acceptedDataDeclaration.value

      context.emit('validate', status)
    }

    return {
      agencyEmail,
      agencyPassword,
      showPasswordField,
      acceptedDataDeclaration,
      validate
    }
  }
}
</script>