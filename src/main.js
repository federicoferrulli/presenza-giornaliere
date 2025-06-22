
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'


import App from './App.vue'
import router from './router'
import firebaseApp from './assets/firebase'

const app = createApp(App)


app.use(VueFire, {
  firebaseApp: firebaseApp,
  modules: [
    // ... other modules
    VueFireAuth(),
  ],
})

app.use(createPinia())
app.use(router)

app.use(Antd).mount('#app');