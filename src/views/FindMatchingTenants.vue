<template>
  <div class="stepper">
    <modal-window v-if="isModalOpen" @close="isModalOpen = false">
      <viewing-invitation
          v-if="!modalFormSubmitted"
          :show-validation-status="showValidationStatusInvitationForm"
          @validate="validationStatusInvitationForm = $event"
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
          :class="{disabled: !validationStatusInvitationForm}"
          v-if="!modalFormSubmitted"
          @click="submitInvitationForm"
      >{{ $t('sendInvitationToTenants') }}</c-button>

      <c-button
          class="link"
          v-if="!modalFormSubmitted"
          @click="isModalOpen = false, currentStep = 3"
      >{{ $t('provideMoreInfo') }}</c-button>

      <c-button
          class="big"
          v-if="modalFormSubmitted"
          @click="isModalOpen = false, currentStep = 0"
      >{{ $t('backToHome') }}</c-button>
    </modal-window>

    <stepper-header
        :steps="steps"
        v-model="currentStep"
        v-if="!steps[currentStep].hideMenu"
    ></stepper-header>

    <div class="stepper-body">
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
            @click="showInvitationForm"
        >{{ $t('sendInvitationToCheckedTenants') }}</c-button>

        <c-button
            class="big"
            :class="{disabled: !validationStatus}"
            v-if="currentStep !== steps.length-1"
            @click="nextStep"
        >{{ $t('next') }}</c-button>

        <c-button
            class="big secondary black-font"
            v-if="currentStep !== 0"
            @click="currentStep--"
        >
          <i class="las la-arrow-left"></i>
        </c-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, defineAsyncComponent, shallowRef, watch } from 'vue';

  import StepperHeader from "@/components/organisms/StepperHeader.vue";
  import CButton from "@/components/cells/cButton.vue";
  import ModalWindow from "@/components/organisms/ModalWindow.vue";
  import ViewingInvitation from "@/views/FindMatchingTenants/ViewingInvitation.vue";
  import AStepperStep from "@/components/atoms/aStepperStep.vue";

  const Register = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/Register.vue")
    // loadingComponent: undefined
  })

  const RoomDetails = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/RoomDetails.vue")
  })

  const AdditionalRoomDetails = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/AdditionalRoomDetails.vue")
  })

  const OptionalRoomDetails = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/OptionalRoomDetails.vue")
  })

  const TenantQuestions = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/TenantQuestions.vue")
  })

  const YourIdealTenant = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/YourIdealTenant.vue")
  })


  export default {
    name: 'Home',
    components: {
      AStepperStep,
      ViewingInvitation,
      ModalWindow,
      CButton,
      StepperHeader
    },

    setup(): Object {
      const steps = shallowRef<Array<Object>>([
        {
          key: 0,
          intlName: 'register',
          component: Register
        },
        {
          key: 1,
          intlName: 'roomDetails',
          component: RoomDetails
        },
        {
          key: 2,
          hideInMenu: true,
          component: AdditionalRoomDetails
        },
        {
          key: 3,
          hideInMenu: true,
          isOptional: true,
          component: OptionalRoomDetails
        },
        {
          key: 4,
          intlName: 'tenantQuestions',
          component: TenantQuestions
        },
        {
          key: 5,
          intlName: 'yourIdealTenant',
          component: YourIdealTenant,
          hideMenu: true
        }
      ]);

      const currentStep = ref<number>(0)

      const validationStatus = ref<boolean>(false)
      const showValidationStatus = ref<boolean>(false)

      function validateForm(): boolean {
        showValidationStatus.value = !validationStatus.value

        return validationStatus.value
      }

      function nextStep(): void {
        if(validateForm()) {
          currentStep.value++
          showValidationStatus.value = false
          validationStatus.value = false
        }
      }

      const isModalOpen = ref<boolean>(false)

      watch(isModalOpen, ():void => {
        modalFormSubmitted.value = false
      })

      const modalFormSubmitted = ref<boolean>(false)

      function showInvitationForm(): void {
        showValidationStatusInvitationForm.value = false
        isModalOpen.value = true
      }

      const validationStatusInvitationForm = ref<boolean>(false)
      const showValidationStatusInvitationForm = ref<boolean>(false)

      function validateInvitationForm(): boolean {
        showValidationStatusInvitationForm.value = !validationStatusInvitationForm.value

        return validationStatusInvitationForm.value
      }

      function submitInvitationForm(): void {
        if(validateInvitationForm()) {
          modalFormSubmitted.value = true
        }
      }

      return {
        steps,
        currentStep,
        isModalOpen,
        modalFormSubmitted,
        validationStatus,
        showValidationStatus,
        nextStep,
        showInvitationForm,
        validationStatusInvitationForm,
        showValidationStatusInvitationForm,
        validateInvitationForm,
        submitInvitationForm
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