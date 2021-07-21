<template>
  <div class="locale-changer">
    <c-button
        class="link no-margin"
        v-for="(lang, i) in langs"
        :key="`Lang${i}`"
        @click="$i18n.locale = lang; setLanguagePreference(lang)"
    >
      {{ lang }}
    </c-button>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
import CButton from "@/components/cells/cButton.vue";

export default {
  name: 'locale-changer',
  components: {CButton},
  setup(): Object {
    const { locale } = useI18n();

    const langs = computed((): Array<string> => {
      return ['en', 'nl'].filter((lang: string): boolean => lang !== locale.value);
    });

    function setLanguagePreference(lang: string): void {
      localStorage.setItem('preferredLanguage', lang);
    }

    return { langs, setLanguagePreference }
  }
}
</script>

<style lang="scss" scoped>
  button.link.no-margin {
    margin-bottom: 0;
    padding: 0.75rem 12px;
  }
</style>