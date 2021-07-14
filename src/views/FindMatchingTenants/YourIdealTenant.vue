<template>
  <a-stepper-step>
    <p>
      <i class="lar la-check-circle"></i><br>
      {{ $t('basedOnOurAlgorithm') }}
    </p>

    <user-list
      v-model="potentialTenants"
    ></user-list>
  </a-stepper-step>
</template>
<script lang="ts">
import AStepperStep from "@/components/atoms/aStepperStep.vue";
import UserList from "@/components/organisms/UserList.vue";
import { useStore } from 'vuex'
import { computed } from 'vue'
import {PotentialTenant} from "@/store/modules/user";

export default {
  components: {UserList, AStepperStep},

  setup() {
    const store = useStore()

    const potentialTenants = computed({
      get: (): Array<PotentialTenant> => store.state.user.property.potentialTenants,
      set: (newValue: Array<PotentialTenant>): void => store.commit('replacePotentialTenants', newValue)
    })

    return { potentialTenants }
  }
}
</script>

<style lang="scss" scoped>

</style>