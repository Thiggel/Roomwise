<template>
  <div class="stepper">
    <invitation-form-window
      v-if="isModalOpen"
      @close="closeModalWindow"
    ></invitation-form-window>

    <stepper-header
        :steps="steps"
        v-model="currentStep"
        v-if="!steps[currentStep].hideMenu"
    ></stepper-header>

    <div class="stepper-body">
      <a-highlighted-message
          :type="errorMessage !== 'userAlreadyExists' ? 'error' : 'info'"
          v-if="errorMessage.length"
      >
        {{ $t(errorMessage) }}
      </a-highlighted-message>

      <a-highlighted-message
          type="info"
          v-if="infoMessage.length"
      >
        {{ $t(infoMessage) }}
      </a-highlighted-message>

      <c-button
          class="link"
          v-if="steps[currentStep].isOptional"
          @click="currentStep++"
      >{{ $t('skipStep') }}</c-button>


      <component
          :is="steps[currentStep].component"
          :show-validation-status="showValidationStatus"
          @validate="validationStatus = $event"
      ></component>

      <div class="stepper-menu">
        <c-button
            class="big"
            v-if="currentStep === steps.length-1"
            @click="isModalOpen = true"
            :loading="stepLoading"
        >{{ $t('sendInvitationToCheckedTenants') }}</c-button>

        <c-button
            class="big"
            :class="{disabled: !validationStatus}"
            v-if="currentStep !== steps.length-1"
            @click="nextStep"
            :loading="stepLoading"
        >{{ $t('next') }}</c-button>

        <c-button
            class="big secondary black-font"
            v-if="currentStep !== 0"
            @click="currentStep--; validationStatus = true"
        >
          <i class="las la-arrow-left"></i>
        </c-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { useStore } from 'vuex'
  import { ref, computed, onMounted } from 'vue'
  import useStepperSteps from '@/modules/useStepperSteps'

  import StepperHeader from "@/components/organisms/StepperHeader.vue"
  import CButton from "@/components/cells/cButton.vue"
  import AHighlightedMessage from "@/components/atoms/aHighlightedMessage.vue"
  import InvitationFormWindow from "@/views/FindMatchingTenants/InvitationFormWindow.vue"
  import ALoadingSpinner from "@/components/atoms/aLoadingSpinner.vue"


  export default {
    name: 'Home',
    components: {
      ALoadingSpinner,
      InvitationFormWindow,
      AHighlightedMessage,
      CButton,
      StepperHeader
    },

    setup(): Object {
      const store = useStore()

      const { steps, currentStep } = useStepperSteps()

      const errorMessage = computed({
        get: () => store.state.findMatchingTenants.errorMessage,
        set: () => store.commit('changeErrorMessage', '')
      })

      const infoMessage = computed({
        get: () => store.state.findMatchingTenants.infoMessage,
        set: () => store.commit('changeInfoMessage', '')
      })

      const showPasswordField = computed((): boolean => store.state.findMatchingTenants.showPasswordField)

      const validationStatus = ref<boolean>(false)
      const showValidationStatus = ref<boolean>(false)

      function validateForm(): boolean {
        showValidationStatus.value = !validationStatus.value

        return validationStatus.value
      }

      const stepLoading = ref<boolean>(false)

      function incrementStep(): void {
        stepLoading.value = false

        if(errorMessage.value === 'userNotLoggedIn')
          currentStep.value = 0

        if(errorMessage.value.length) return

        currentStep.value++
        showValidationStatus.value = false
        validationStatus.value = false
      }

      function loginOrRegister() {
        if(showPasswordField.value) {
          errorMessage.value = ''
          store.dispatch('loginUser').then(incrementStep)
        } else {
          errorMessage.value = ''
          store.dispatch('createUser').then(incrementStep)
        }
      }

      function nextStep(): void {
        infoMessage.value = ''

        if(validateForm()) {
          stepLoading.value = true
          if(currentStep.value === 0) {
            loginOrRegister()
          } else if(currentStep.value > 0 && currentStep.value < 10) {
            errorMessage.value = ''
            if(currentStep.value >= 3) {
              store.commit('alterProperty', { status: 'publish' })
            }
            stepLoading.value = true

            if(store.state.user.property.createListing)
              store.commit('alterProperty', { status: 'publish' })

            store.dispatch('upsertRoom').then(incrementStep)
          }

          if(currentStep.value === 9) {
            store.dispatch('getMatchingTenants')
          }
        }
      }

      const isModalOpen = ref<boolean>(false)

      function closeModalWindow(event: any): void {
        if(event?.currentStep !== undefined) {
          currentStep.value = event.currentStep
        }

        isModalOpen.value = false
      }

      onMounted(() => {
        window.addEventListener('keyup', (event: KeyboardEvent) => {
          const KEYCODE_ENTER = 13

          if(event.keyCode !== KEYCODE_ENTER)
            return

          if(currentStep.value === steps.value.length-1) {
            isModalOpen.value = true
          } else {
            nextStep()
          }
        })

        store.dispatch('sendInvitations')
      })

      return {
        errorMessage,
        steps,
        currentStep,
        isModalOpen,
        validationStatus,
        showValidationStatus,
        nextStep,
        closeModalWindow,
        stepLoading,
        infoMessage
      }
    }
  }
</script>

<style lang="scss">
  .stepper {
    max-width: 900px;

    @include desktop {
      margin: 80px auto;
      padding: 0 20px;
    }
  }

  .stepper-body {
    background: var(--color-white);
    padding: 20px 20px 0;

    @include desktop {
      border-radius: var(--border-radius-standard);
      padding: 80px 80px 60px;
    }

    .stepper-menu {
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: stretch;
      padding: 20px 0;

      button:first-child + .secondary {
        margin-right: 16px;
        width: 25%;
        min-width: 80px;
      }
    }
  }
</style>