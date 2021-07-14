<template>
  <div class="user-list-item">
    <img :src="modelValue.picture">

    <div class="information">
      <div class="name">{{ modelValue.name }}</div>
      <div class="match">{{ modelValue.match }}% Match</div>
    </div>

    <div class="actions">
      <c-button>{{ $t('viewProfile') }}</c-button>
      <c-checkbox v-model="sendInvitation">{{ $t('sendInvitation') }}</c-checkbox>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from "vue";
  import CButton from "@/components/cells/cButton.vue";
  import CCheckbox from "@/components/cells/cCheckbox.vue";

  export default defineComponent({
    name: 'cUserListItem',
    components: {CCheckbox, CButton},
    props: {
      modelValue: Object
    },

    emits: [ 'update:modelValue' ],

    setup(props, context) {
      const sendInvitation = ref<boolean>(props.modelValue?.sendInvitation)

      watch(sendInvitation, (newValue: boolean): void => {
        let user = props.modelValue
        if(user) user.sendInvitation = newValue
        context.emit('update:modelValue', user)
      })

      return { sendInvitation }
    }

  });
</script>

<style lang="scss">
  .user-list-item {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    background: var(--color-light-lightgrey);
    border-radius: var(--border-radius-standard);
    margin-bottom: 20px;
    padding: 16px;

    img {
      width: 100px;
      height: 100px;
      min-width: 100px;
      object-fit: cover;
      border-radius: var(--infinite);
    }

    .information,
    .actions {
      display: flex;
      flex-direction: column;
    }

    .information {
      margin: 0 16px;
      width: 100%;

      .name {
        color: var(--color-black);
      }

      .match {
        color: var(--color-green);
      }
    }

    .actions {
      width: 100%;
    }
  }
</style>