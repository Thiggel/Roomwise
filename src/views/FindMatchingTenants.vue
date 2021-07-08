<template>
  <div>
    <stepper-header :steps="steps" :currentStep="currentStep" @changeStep="changeStep"></stepper-header>

    <div class="stepper-body">

      <div class="stepper-menu">
        <c-button
            class="secondary"
            v-if="currentStep !== 0"
            @click="currentStep--"
        >←</c-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, defineAsyncComponent, reactive } from 'vue';

  import StepperHeader from "@/components/organisms/StepperHeader.vue";
  import CButton from "@/components/cells/cButton.vue";

  const Register = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/Register.vue")
    // loadingComponent: undefined
  })

  const RoomDetails = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/RoomDetails.vue")
  })

  const YourIdealTenant = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/YourIdealTenant.vue")
  })

  const ViewingInvitation = defineAsyncComponent({
    loader: (): any => import("@/views/FindMatchingTenants/ViewingInvitation.vue")
  })


  export default {
    name: 'Home',
    components: {
      CButton,
      StepperHeader
    },

    setup(): Object {
      const steps = reactive<Array<Object>>([
        {
          intlName: 'register',
          component: Register
        },
        {
          intlName: 'roomDetails',
          component: RoomDetails
        },
        {
          intlName: 'yourIdealTenant',
          component: YourIdealTenant
        },
        {
          intlName: 'viewingInvitation',
          component: ViewingInvitation
        }
      ]);

      const currentStep = ref<number>(0)

      function changeStep(newStep: number): void {
        currentStep.value = newStep
      }

      return { steps, currentStep, changeStep }
    }
  }
</script>

<style lang="scss">
  .stepper-body {
    position: absolute;
    top: 256px;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--color-white);
  }
</style>