<template>
  <a-stepper-step>
    <c-upload
        :title="$t('uploadImages')"
        :required="true"
        type="upload"
        key="propertyImages"
        v-model="propertyImages"
        @validate="validate($event, 'propertyImages')"
        :showValidationStatus="showValidationStatus"
        @update:model-value="$emit('input')"
    ></c-upload>

    <c-text-field
        :title="$t('roomSize')"
        :required="true"
        placeholder="m2"
        key="propertyRoomSize"
        v-model="propertyRoomSize"
        @update:model-value="$emit('input')"
        @validate="validate($event, 'propertyRoomSize')"
        :showValidationStatus="showValidationStatus"
        regexp="^[0-9]+$"
    ></c-text-field>
  </a-stepper-step>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import {computed, onMounted, reactive} from 'vue'
import CTextField from "@/components/cells/cTextField.vue"
import AStepperStep from "@/components/atoms/aStepperStep.vue"
import CUpload from "@/components/cells/cUpload.vue"


export default {
  components: {CUpload, AStepperStep, CTextField},

  props: {
    showValidationStatus: {
      type: Boolean,
      default: false
    }
  },

  emits: ['input', 'validate'],

  setup(_: any, context: any) {
    const store = useStore()

    const propertyRoomSize = computed({
      get: (): string => store.state.user.property.size,
      set: (value: string): void => store.commit('alterProperty', { size: value })
    })

    const propertyImages = computed({
      get: (): string => store.state.user.property.images,
      set: (value: string): void => store.commit('alterProperty', { images: value })
    })

    const validationStatus: any = reactive<object>({
      propertyImages: false,
      propertyRoomSize: false,
    })

    function validate(event: any, key: string) {
      validationStatus[key] = event
      context.emit('validate', Object.values(validationStatus).every(item => item))
    }

    onMounted((): void => {
      context.emit('validate', propertyRoomSize.value.length && propertyImages.value.length)
    })

    return { propertyRoomSize, propertyImages, validationStatus, validate }
  }
}
</script>