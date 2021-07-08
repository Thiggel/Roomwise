import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
// User defined lang
import enLocale from './en'
import nlLocale from './nl'

const messages = {
  nl: {
    ...nlLocale
  },
  en: {
    ...enLocale
  }
}

const getLocale = () => {
  const savedLang: string|null = localStorage.getItem('preferredLanguage')

  if(savedLang)
    return savedLang;

  return navigator.language.split("-")[0];
}

const i18n = createI18n({
  locale: getLocale(),
  fallbackLocale: 'nl',
  messages
})

// export default i18n
export default (app: App<Element>): void => {
  app.use(i18n)
}
