<template>
  <div class="upload">
    <label :for="key">
      {{ title }}<i v-if="required" class="required">*</i>
    </label>
    <div class="upload-area" :class="{red: required && showValidationStatus && !uploadedFiles.length}">
      <input
          type="file"
          multiple
          :disabled="loading"
          accept="image/*"
          @input="uploadFiles($event.target.files)"
      >
      <i class="las la-spinner" v-if="loading"></i>
      <i class="las la-cloud-upload-alt" v-else></i>
    </div>
    <div class="preview-files">
      <div class="added-file" v-for="(file, key) in uploadedFiles" :key="'file-' + key">
        <div class="remove-file" @click="removeFile(file)"></div>
        <img :src="file">
      </div>
    </div>
    <label>{{ $t(uploadError) }}</label>
    <span class="error-message" v-if="required && showValidationStatus && !uploadedFiles.length">{{ $t('thisFieldIsRequired') }}</span>
    <label class="max-size">Max: 10Mb</label>
  </div>

</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import axios from 'axios'
  import { Files } from '../../types'

  export default defineComponent({
    name: 'cUpload',

    props: {
      title: String,
      required: Boolean,
      key: String,
      showValidationStatus: Boolean
    },

    setup(props: any, context: any) {
      const loading = ref<boolean>(false)
      const uploadedFiles = ref<Array<string>>([])
      const uploadError = ref<string>("")

      function uploadFiles(files: Files|null): void {
        const formData = new FormData()

        if (!files?.length) return

        files.forEach((file: File): void => formData.append("file[]", file, file.name))

        loading.value = true

        axios.post('http://localhost:8888/wp-json/roomwise/v1/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response: any) => {
          loading.value = false

          if(response.data.success) {
            response.data.files.forEach((file: string) => {
              if(!uploadedFiles.value.includes(file)) {
                uploadedFiles.value.push(file)
                context.emit('update:modelValue', uploadedFiles.value)
                context.emit('validate', !props.required || uploadedFiles.value.length)
              }
            })
          }
        })
      }

      function removeFile(file: string): void {
        uploadedFiles.value.splice(uploadedFiles.value.indexOf(file), 1)
        context.emit('update:modelValue', uploadedFiles.value)
        context.emit('validate', !props.required || uploadedFiles.value.length)
      }

      return { loading, uploadFiles, uploadedFiles, uploadError, removeFile }
    }
  });
</script>

<style lang="scss" scoped>
  .upload {
    width: 100%;
    margin-bottom: 20px;
    cursor: pointer;

    p {
      font-size: 1rem;
      font-weight: 400;
    }

    label {
      .required {
        color: var(--color-red);
      }

      &.max-size {
        color: var(--color-lightgrey);
      }
    }

    span.error-message {
      font-size: 0.75rem;
      color: var(--color-darkgrey);
      line-height: 0.75rem;
      display: block;
      width: auto;
      margin-bottom: 24px;
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
      transition: all 0.25s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &.red {
        border: 1px solid var(--color-red);
      }

      input[type=file] {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        opacity: 0;
        cursor: pointer;
        z-index: 9;
      }

      .la,
      .las {
        position: absolute;
        font-size: 50px;
        color: var(--color-lightgrey);
        transition: 0.25s ease;
        z-index: 1;

        &.la-spinner {
          animation: spin 1s linear infinite;
          color: var(--color-green)
        }
      }

      &:hover {
        box-shadow: 0 0 0 3px var(--color-green);

        .la,
        .las {
          transform: scale(1.1);
          color: var(--color-green)
        }
      }
    }

    .preview-files {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      margin-top: 24px;

      .added-file {
        position: relative;
        margin-right: 32px;

        .remove-file {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--color-green);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;

          &:hover {
            transform: scale(1.25);
          }

          &:before {
            content: "\f00d";
            font-family: 'Line Awesome Free';
            font-weight: 900;
            color: var(--color-white);
            font-size: 16px;
          }
        }
      }

      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: var(--border-radius-standard);
        border: 1px solid var(--color-lightgrey);
      }
    }
  }
</style>