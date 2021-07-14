<template>
  <div class="upload">
    <label :for="key">
      {{ title }}<i v-if="required" class="required">*</i>
    </label>
    <div class="upload-area">
      <input
          type="file"
          multiple
          :disabled="loading"
          accept="image/*"
          @input="uploadFiles($event.target.files)"
      >
      <i class="las la-cloud-upload-alt"></i>
      <p v-if="loading">{{ $t('uploadingFiles') }}</p>
    </div>
    <label class="max-size">Max: 10Mb</label>
  </div>

</template>

<script lang="ts">
import { ref, defineComponent } from "vue"
import axios from 'axios'
import { Files } from '../../types'

export default defineComponent({
  name: 'cUpload',

  props: {
    title: String,
    required: Boolean,
    key: String
  },

  setup() {
    const loading = ref<boolean>(false)
    const uploadedFiles = ref<Array<object>>([])
    const uploadError = ref<string>("")

    function upload(formData: FormData) {
      const BASE_URL = 'https://www.roomwise.nl/wp-json/roomwise/v1';

      return axios({
        method: 'POST',
        url: `${BASE_URL}/upload/`,
        data: formData
      })
      .then(x => x.data)
      .then(x => x.map((img: any) => Object.assign({},
          img, { url: `${BASE_URL}/images/${img.id}` })));
    }

    function uploadFiles(files: Files|null): void {
      const formData = new FormData()

      if (!files?.length) return;

      files.forEach((file: File): void => {
        console.log(file)
        formData.append("file[]", file, file.name);
      })

      loading.value = true

      upload(formData)
        .then(x => {
          uploadedFiles.value.push([].concat(x));
          loading.value = false
        })
        .catch(err => {
          uploadError.value = err.response;
        })
    }

    return { loading, uploadFiles }
  }
});
</script>

<style lang="scss" scoped>
  .upload {
    width: 100%;
    margin-bottom: 20px;
    cursor: pointer;

    label {
      .required {
        color: var(--color-red);
      }

      &.max-size {
        color: var(--color-lightgrey);
      }
    }

    .upload-area {
      border: 1px solid var(--color-lightgrey);
      border-radius: var(--border-radius-standard);
      font-size: 1rem;
      padding: 20px;
      background: var(--color-white);
      margin: 12px 0;
      width: calc(100% - 42px);
      height: 200px;
      position: relative;

      input[type=file] {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        opacity: 0;
        cursor: pointer;
      }

      .la,
      .las {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        color: var(--color-lightgrey);
        transition: 0.25s ease;
      }

      &:hover {

        .la,
        .las {
          transform: scale(1.1) translate(-50%, -50%);
        }
      }
    }
  }
</style>