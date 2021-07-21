<template>
  <a-stepper-step>
    <c-text-field
        :title="$t('describeProperty')"
        :placeholder="$t('title')"
        :required="true"
        key="propertyTitle"
        v-model="propertyTitle"
        @update:model-value="$emit('input')"
        @validate="validate($event, 'propertyTitle')"
        :showValidationStatus="showValidationStatus"
    ></c-text-field>

    <c-text-field
        type="select"
        :title="$t('city')"
        placeholder="Amsterdam"
        :required="true"
        key="propertyCity"
        v-model="propertyCity"
        @update:model-value="$emit('input')"
        @validate="validate($event, 'propertyCity')"
        :showValidationStatus="showValidationStatus"
    ></c-text-field>

    <div class="stepper-row">
      <c-text-field
          :title="$t('street')"
          :placeholder="$t('streetName')"
          :required="true"
          key="propertyStreet"
          v-model="propertyStreet"
          @update:model-value="$emit('input')"
          @validate="validate($event, 'propertyStreet')"
          :showValidationStatus="showValidationStatus"
      ></c-text-field>

      <c-text-field
          :title="$t('number')"
          placeholder="#"
          :short="true"
          :required="true"
          key="propertyHouseNumber"
          v-model="propertyHouseNumber"
          @update:model-value="$emit('input')"
          @validate="validate($event, 'propertyHouseNumber')"
          :showValidationStatus="showValidationStatus"
          regexp="^[0-9A-Za-z]+$"
      ></c-text-field>
    </div>

    <div class="stepper-row">
      <c-text-field
          :title="$t('pricePerMonth')"
          placeholder="€"
          :placeholderRight="true"
          :required="true"
          key="propertyPrice"
          v-model="propertyPrice"
          @update:model-value="$emit('input')"
          @validate="validate($event, 'propertyPrice')"
          :showValidationStatus="showValidationStatus"
          regexp="^[€]?[ ]?\d{1,5}(?:[.,]\d{3})*(?:[.,]\d{2})?[ ]?[€]?$"
      ></c-text-field>

      <c-text-field
          :title="$t('oneTimeAgencyFees')"
          :placeholderRight="true"
          :required="true"
          key="oneTimeAgencyFees"
          v-model="oneTimeAgencyFees"
          @update:model-value="$emit('input')"
          @validate="validate($event, 'oneTimeAgencyFees')"
          :showValidationStatus="showValidationStatus"
          regexp="^[A-Za-z0-9€ ]*$"
      ></c-text-field>
    </div>

    <c-text-field
        :title="$t('moveInDate')"
        :required="true"
        key="propertyMoveInDate"
        v-model="propertyMoveInDate"
        @update:model-value="$emit('input')"
        @validate="validate($event, 'propertyMoveInDate')"
        :showValidationStatus="showValidationStatus"
        regexp="^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$"
    ></c-text-field>

    <c-checkbox v-model="createListing">{{ $t('createListing') }}</c-checkbox>
  </a-stepper-step>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, reactive } from 'vue'
import CTextField from "@/components/cells/cTextField.vue"
import AStepperStep from "@/components/atoms/aStepperStep.vue"
import CCheckbox from "@/components/cells/cCheckbox.vue"


export default {
  components: {CCheckbox, AStepperStep, CTextField},

  props: {
    showValidationStatus: {
      type: Boolean,
      default: false
    }
  },

  emits: ['input', 'validate'],

  setup(_: any, context: any) {
    const store = useStore()

    const propertyTitle = computed({
      get: (): string => store.state.user.property.title,
      set: (value: string): void => store.commit('alterProperty', { title: value })
    })

    const propertyCity = computed({
      get: (): string => store.state.user.property.city,
      set: (value: string): void => store.commit('alterProperty', { city: value })
    })

    const propertyStreet = computed({
      get: (): string => store.state.user.property.street,
      set: (value: string): void => store.commit('alterProperty', { street: value })
    })

    const propertyHouseNumber = computed({
      get: (): string => store.state.user.property.houseNumber,
      set: (value: string): void => store.commit('alterProperty', { houseNumber: value })
    })

    const propertyPrice = computed({
      get: (): string => store.state.user.property.pricePerMonth,
      set: (value: string): void => store.commit('alterProperty', { pricePerMonth: value })
    })

    const propertyMoveInDate = computed({
      get: (): string => store.state.user.property.moveInDate,
      set: (value: string): void => store.commit('alterProperty', { moveInDate: value })
    })

    const createListing = computed({
      get: (): string => store.state.user.property.createListing,
      set: (value: string): void => store.commit('alterProperty', { createListing: value })
    })

    const oneTimeAgencyFees = computed({
      get: (): string => store.state.user.property.oneTimeAgencyFees,
      set: (value: string): void => store.commit('alterProperty', { oneTimeAgencyFees: value })
    })

    const validationStatus: any = reactive<object>({
      propertyTitle: false,
      propertyCity: false,
      propertyStreet: false,
      propertyHouseNumber: false,
      propertyPrice: false,
      propertyMoveInDate: false,
      oneTimeAgencyFees: false
    })

    function validate(event: any, key: string) {
      validationStatus[key] = event
      context.emit('validate', Object.values(validationStatus).every(item => item))
    }

    return { createListing, propertyTitle, propertyCity, propertyStreet, propertyHouseNumber, propertyPrice, propertyMoveInDate, oneTimeAgencyFees, validationStatus, validate }
  }
}
</script>