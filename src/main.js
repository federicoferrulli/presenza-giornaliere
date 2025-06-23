
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import '@/assets/styles/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { firebaseApp } from './assets/firebase'

import { VueFire, VueFireAuth } from 'vuefire'

const app = createApp(App)

app.use(VueFire, {
  firebaseApp: firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})
  .use(createPinia())
  .use(router)
  .use(Antd)
  .mount('body');