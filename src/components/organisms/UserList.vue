<template>
  <div class="user-list">
    <c-user-list-item
      v-for="(user, key) in userList"
      :key="'user' + key"
      v-model="userList[key]"
    ></c-user-list-item>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, reactive } from "vue";
  import CUserListItem from "@/components/cells/cUserListItem.vue";
  import {PotentialTenant} from "@/store/modules/user";

  export default defineComponent({
    name: 'UserList',
    components: {CUserListItem},
    props: {
      modelValue: Array
    },

    emits: [ 'update:modelValue' ],

    setup(props: any, context: any): Object {
      const userList = reactive<Array<PotentialTenant>>(props.modelValue)

      watch(userList, (newValue: object) => {
        context.emit('update:modelValue', newValue)
      })

      return { userList }
    }

  });
</script>