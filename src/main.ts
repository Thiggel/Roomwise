import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installI18n from './lang/index'
import axios from 'axios'
const app = createApp(App)

installI18n(app)

app
    .use(store)
    .use(router)
    .mount('#app')