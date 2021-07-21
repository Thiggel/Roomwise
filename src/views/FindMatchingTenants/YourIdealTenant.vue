<template>
  <a-stepper-step>
    <p>
      <i class="lar la-check-circle"></i><br>
      {{ $t('basedOnOurAlgorithm') }}
    </p>

    <div
        class="searches-left"
        v-html="searchesLeftText"
        v-if="searchesLeft !== undefined"
    ></div>

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
import {useI18n} from "vue-i18n";

export default {
  components: {UserList, AStepperStep},

  setup() {
    const store = useStore()
    const { t } = useI18n()

    const searchesLeft = computed((): any => store.state.user.searchesLeft)

    const searchesLeftText = computed(() => {
      if(parseInt(searchesLeft.value) === 0) {
        return t('noSearchesLeft')
      }

      return t('searchesLeft', { searchesLeft: searchesLeft.value }) + " " + t('searchesLeftTwo');
    })

    const potentialTenants = computed({
      get: (): Array<PotentialTenant> => store.state.user.property.potentialTenants,
      set: (newValue: Array<PotentialTenant>): void => store.commit('replacePotentialTenants', newValue)
    })

    return { potentialTenants, searchesLeft, searchesLeftText }
  }
}
</script>

<style lang="scss" scoped>
.searches-left {
  text-align: center;
  width: calc(100% - 48px);
  padding: 24px;
  background: var(--color-light-yellow);
  margin-bottom: 48px;
  border-radius: var(--border-radius-standard);
}
</style>