<template>
  <modal-window @close="close">
    <viewing-invitation
        v-if="!submitted"
        :show-validation-status="showValidationStatus"
        @validate="validationStatus = $event"
    ></viewing-invitation>
    <div v-else>
      <a-stepper-step>
        <p>
          <i class="lar la-check-circle"></i><br>
          {{ $t('tenantsReceivedInvite') }}
        </p>
      </a-stepper-step>
    </div>

    <c-button
        class="big"
        :class="{disabled: !validationStatus}"
        v-if="!submitted"
        @click="submit"
    >{{ $t('sendInvitationToTenants') }}</c-button>

    <c-button
        class="link"
        v-if="!submitted"
        @click="close({ currentStep: 3 })"
    >{{ $t('provideMoreInfo') }}</c-button>

    <c-button
        class="big"
        v-if="submitted"
        @click="close({ currentStep: 0 })"
    >{{ $t('backToHome') }}</c-button>
  </modal-window>
</template>

<script lang="ts">
import { ref } from "vue";
import ModalWindow from "@/components/organisms/ModalWindow.vue"
import ViewingInvitation from "@/views/FindMatchingTenants/ViewingInvitation.vue"
import CButton from "@/components/cells/cButton.vue"
import AStepperStep from "@/components/atoms/aStepperStep.vue"

export default {
  emits: ['close'],

  components: {
    ModalWindow,
    ViewingInvitation,
    CButton,
    AStepperStep
  },

  setup(_: any, context: any) {
    const submitted = ref<boolean>(false)
    const validationStatus = ref<boolean>(false)
    const showValidationStatus = ref<boolean>(false)

    function validate(): boolean {
      showValidationStatus.value = !validationStatus.value

      return validationStatus.value
    }

    function submit(): void {
      if(validate()) {
        submitted.value = true
      }
    }

    function close(payload: any) {
      submitted.value = false
      showValidationStatus.value = false
      context.emit('close', payload)
    }

    return { submitted, submit, validationStatus, showValidationStatus, close }
  }
}
</script>