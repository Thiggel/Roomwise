<template>
  <a-stepper-step>
    <c-text-field
      :title="$t('doYouWantToAddPersonalMessage')"
      type="textarea"
      key="invitationMessage"
      v-model="invitationMessage"
      @update:model-value="$emit('input')"
      @validate="validate($event, 'invitationMessage')"
      :showValidationStatus="showValidationStatus"
      regexp="\w+"
    >
    </c-text-field>

    <c-text-field
      :title="$t('chooseDateForViewing')"
      :required="true"
      key="invitationDate"
      v-model="invitationDate"
      @update:model-value="$emit('input')"
      @validate="validate($event, 'invitationDate')"
      :showValidationStatus="showValidationStatus"
      regexp="^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$"
    ></c-text-field>

    <c-text-field
        :title="$t('chooseTimeForViewing')"
        :required="true"
        key="invitationTime"
        v-model="invitationTime"
        @update:model-value="$emit('input')"
        @validate="validate($event, 'invitationTime')"
        :showValidationStatus="showValidationStatus"
        regexp=".*"
    ></c-text-field>
  </a-stepper-step>
</template>

<script lang="ts">
import AStepperStep from "@/components/atoms/aStepperStep.vue";
import CTextField from "@/components/cells/cTextField.vue";
import {useStore} from "vuex";
import {computed, reactive} from "vue";

export default {
  components: {CTextField, AStepperStep},

  props: {
    showValidationStatus: {
      type: Boolean,
      default: false
    }
  },

  emits: ['input', 'validate'],

  setup(_: any, context: any) {
    const store = useStore()

    const invitationMessage = computed({
      get: (): string => store.state.user.property.viewingInvitation.message,
      set: (value: string): void => store.commit('alterViewingInvitation', { message: value })
    })

    const invitationDate = computed({
      get: (): string => store.state.user.property.viewingInvitation.date,
      set: (value: string): void => store.commit('alterViewingInvitation', { date: value })
    })

    const invitationTime = computed({
      get: (): string => store.state.user.property.viewingInvitation.time,
      set: (value: string): void => store.commit('alterViewingInvitation', { time: value })
    })

    const validationStatus: any = reactive<object>({
      invitationMessage: false,
      invitationDate: false,
      invitationTime: false
    })

    function validate(event: any, key: string) {
      validationStatus[key] = event
      context.emit('validate', Object.values(validationStatus).every(item => item))
    }

    return { invitationMessage, invitationDate, invitationTime, validate }
  }
}
</script>

<style lang="scss" scoped>
  button.button.link {
    margin-bottom: 0;
    margin-top: 20px;
  }
</style>