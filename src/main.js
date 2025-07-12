
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import '@/assets/styles/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import firebaseApp from './assets/firebase'
import { VueFire, VueFireAuth } from 'vuefire'

const app = createApp(App)
const pinia = createPinia()

app.provide('types', Object.freeze([
    {id: null, value: '--'},
    {id: 1, value: 'Attività', colour: 'green'},
    {id: 2, value: 'Ferie', colour: 'blue' },
    {id: 3, value: 'Malattia', colour: 'red'},
    {id: 4, value: 'Festività', colour: 'aquamarine'},
    {id: 5, value: 'Donazione/Elezione', colour: 'brown'},
    {id: 6, value: 'Sciopero', colour: 'yellow'},
    {id: 7, value: 'Legge 104', colour: 'orange'},
    {id: 8, value: 'Lutto', colour: 'black'}
]));

app.provide('EventDTO', class EventDTO{
  constructor({
    userId, currDate, duration, dateStart, dateEnd, type
  }){
    this.timestamp = currDate;
    this.userId = userId;
    this.startDate = dateStart;  
    this.endDate = dateEnd;
    this.duration = duration;
    this.category = type;
  }

  toObject(){
    return {
      timestamp: new Date(this.timestamp),
      userId: this.userId,
      startDate: this.startDate,  
      endDate: this.endDate,
      duration: this.duration,
      category: this.category,
    }
  }
})

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