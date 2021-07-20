<template>
  <div class="user-list">
    <div class="empty-state" v-if="!userList.length">
      {{ $t('noMatchesFound') }}
    </div>

    <c-user-list-item
      v-for="(user, key) in userList.slice(0, 5 * step)"
      :key="'user' + key"
      v-model="userList[key]"
    ></c-user-list-item>

    <c-button class="link" @click="step++" v-if="5 * step < userList.length">{{ $t('showMoreMatches') }}</c-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, reactive, ref } from "vue"
  import CUserListItem from "@/components/cells/cUserListItem.vue"
  import { PotentialTenant } from "@/store/modules/user"
  import CButton from "@/components/cells/cButton.vue";

  export default defineComponent({
    name: 'UserList',
    components: {CButton, CUserListItem},
    props: {
      modelValue: Array
    },

    emits: [ 'update:modelValue' ],

    setup(props: any, context: any): Object {
      const userList = reactive<Array<PotentialTenant>>(props.modelValue)

      const step = ref<number>(1)

      watch(userList, (newValue: object) => {
        context.emit('update:modelValue', newValue)
      })

      return { step, userList }
    }

  });
</script>

<style lang="scss">
  .user-list {
    .empty-state {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: calc(100% - 48px);
      padding: 24px;
      background: var(--color-lightgrey);
      margin-bottom: 48px;
      border-radius: var(--border-radius-standard);
    }
  }
</style>