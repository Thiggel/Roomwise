<template>
  <div class="user-list-item">
    <img
        src="../../assets/profile-picture-placeholder.png"
        v-if="profilePicture === '' || !profilePicture"
    >
    <img
        :src="profilePicture"
        @error="changePictureToFallback"
        v-else
    >

    <div class="information">
      <div class="name">{{ modelValue.name }}</div>
      <div class="match">{{ modelValue.match }}% Match</div>
    </div>

    <div class="actions">
      <c-button type="link" :to="modelValue.profileLink" target="_blank">{{ $t('viewProfile') }}</c-button>
      <c-checkbox v-model="sendInvitation" :key="modelValue.name">{{ $t('sendInvitation') }}</c-checkbox>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from "vue"
  import CButton from "@/components/cells/cButton.vue"
  import CCheckbox from "@/components/cells/cCheckbox.vue"

  export default defineComponent({
    name: 'cUserListItem',
    components: {CCheckbox, CButton},

    props: {
      modelValue: Object
    },

    emits: [ 'update:modelValue' ],

    setup(props: any, context: any) {
      const sendInvitation = ref<boolean>(props.modelValue?.sendInvitation)

      watch(sendInvitation, (newValue: boolean): void => {
        let user = props.modelValue
        if(user) user.sendInvitation = newValue
        context.emit('update:modelValue', user)
      })

      const profilePicture = ref<string>(props.modelValue.picture)

      function changePictureToFallback(): void {
        profilePicture.value = require('@/assets/profile-picture-placeholder.png')
      }


      return { sendInvitation, profilePicture, changePictureToFallback }
    }

  });
</script>

<style lang="scss">
  .user-list-item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    background: var(--color-light-lightgrey);
    border-radius: var(--border-radius-standard);
    margin-bottom: 20px;
    padding: 16px;

    img {
      width: 45px;
      height: 45px;
      min-width: 45px;
      object-fit: cover;
      border-radius: var(--infinite);

      @include desktop {
        width: 100px;
        height: 100px;
        min-width: 100px;
      }
    }

    .information {
      display: flex;
      margin: 0 16px;
      flex-direction: column;

      .name {
        color: var(--color-black);
      }

      .match {
        color: var(--color-green);
      }
    }

    .actions {
      display: flex;
      width: 100%;
      align-items: center;

      button,
      label {
        font-size: 0.6rem;

        @include desktop {
          font-size: 0.75rem;
        }
      }

      a.button {
        padding: 0.5rem 2rem;
        margin-right: 16px;
        margin-top: 16px;

        @include desktop {
          padding: 0.75rem 2rem;
        }
      }
    }
  }
</style>