
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import '@/assets/styles/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import firebaseApp from './assets/firebase'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import { VueFire, VueFireAuth } from 'vuefire'

const app = createApp(App)
const pinia = createPinia()

pinia.use(createPersistedState({
  auto: true,
}))

app.use(VueFire, {
  firebaseApp: firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})
  .use(pinia)
  .use(router)
  .use(Antd)
  .mount('body');