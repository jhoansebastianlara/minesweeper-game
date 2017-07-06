import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {CONSTANTS} from '@/shared/constants'

// langs
import en from './langs/en'
import es from './langs/es'

Vue.use(VueI18n)

// Ready translated locale messages
const messages = { en, es }

// Create VueI18n instance with options
export default new VueI18n({
  locale: CONSTANTS.LANGUAGES.DEFAULT,
  fallbackLocale: CONSTANTS.LANGUAGES.DEFAULT,
  messages
})
