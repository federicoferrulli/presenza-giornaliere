<template>
  <addEvent :title="'Nuova attività'" :currDate="date" :onClose="onToggleModal" :onSubmit="onSubmitModal" :open="modalOpen" ></addEvent>
  <div class="p-4">
    <div class="flex flex-col lg:flex-row gap-4">
      <a-alert v-if="!isLargeScreen" :message="`Ore lavorate questo mese: ${ monthDurationTotal }`" />
      <div class="flex-1 min-w-0">
        <a-calendar :locale="objLang" v-model:value="date" :fullscreen="isLargeScreen" @change="onPanelChange" @panelChange="onPanelChange">
          <template #dateCellRender="{ current }">
            <ul class="events">
              <template v-if="getListData(current).length > 0">
                <template v-for="category of Array.from(hashTypeActivity.get(current.$d.getTime()))">
                  <a-badge :color="types.getById(category).colour" class="w-full" />
                </template>
              </template>
            </ul>
          </template>
        </a-calendar>
      </div>
      <div class="w-full lg:w-150 flex-shrink-0">

        <a-alert v-if="isLargeScreen" :message="`Ore lavorate questo mese: ${ monthDurationTotal }`" />
        <br>
        <a-list bordered :data-source="activities">
          <template #header>
            <div class="flex justify-between">
              <div>Attività del {{ date.format('DD-MM-YYYY') }}</div>
              <div>
                <a-button type="link" @click="onToggleModal" shape="circle">+</a-button>
              </div>  
            </div>
          </template>
          <template #renderItem="{ item }">

           
            <a-list-item>
              
              <a-list-item-meta
                :description="getDescription(item)"
              >
                <template #title>
                  <a-badge :color="types.getById(item.category).colour" :text="types.getById(item.category).value" />
                </template>
              </a-list-item-meta>
           
              <template #actions>
                <!-- <a key="list-loadmore-edit"><EditOutlined></EditOutlined></a> -->
                <a-popconfirm placement="topRight" ok-text="Si" cancel-text="No" @confirm="deleteCurr(item)">
                  <template #title>
                    Vuoi eliminare questo elemento?
                  </template>
                  <a key="list-loadmore-delete" @click="" ><DeleteOutlined></DeleteOutlined></a>
                </a-popconfirm>
              </template>
            </a-list-item>
          </template>
        </a-list>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { inject } from 'vue'
import dayjs from 'dayjs';
import addEvent from '@/components/addEvent.vue';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import 'dayjs/locale/it';
import { storeToRefs } from 'pinia';
import { useResponsiveStore } from '@/states/responsive.state.js';
import { useFirestore, useCollection, useCurrentUser } from 'vuefire'
import { collection, doc, deleteDoc, addDoc, query, where } from 'firebase/firestore'
import { message } from 'ant-design-vue';


const types = inject('types');
const EventDTO = inject('EventDTO');

const currentUser = useCurrentUser();

function getDescription(item){

  if(item?.startDate && item?.endDate && item.duration){
    return 'dalle '+ item?.startDate + ' alle '+ item?.endDate + ' ore registrate '+ (item?.duration * 2.77778e-7).toFixed(2)
  }else{
    return '-'
  }
}

const db = useFirestore();
let currEvents = useCollection(
  query( 
    collection(db, "events"),
    where("userId", "==", currentUser.value.uid), 
  ),
);




const responsiveStore = useResponsiveStore();
const { isLargeScreen } = storeToRefs(responsiveStore);
dayjs.locale('it')

const objLang = {
  "lang": {
    "locale": "it_IT",
    "month": "Mese",
    "year": "Anno",
  }
}

const date = ref(dayjs());

let firstDayMonth = ref(null);
let lastDayMonth = ref(null);
let monthDurationTotal = computed(()=>{
  try{
    let tot = 0;
    let currEvent;
    for(let i = 0; i<currEvents.value.length; i++){
      currEvent = currEvents.value.at(i)
      let currTime = currEvent.timestamp.toDate().getTime();
      if(currTime>=firstDayMonth.value.getTime()  && currTime <lastDayMonth.value.getTime()){
        tot += currEvent.duration;
      }
    }
    return (tot / 3_600_000).toFixed(2);
  }catch(e){
    console.error(e)
    return 0;
  }

})

watch(date, function(){
  getLimitMonth()
}, {immediate: true})


function getLimitMonth(){
  try{
    firstDayMonth.value = new Date(date.value.$y, date.value.$M, 1);
    lastDayMonth.value = new Date(date.value.$y, date.value.$M +1, 1);
  }catch(e){
    console.error(e)
  }
}


async function deleteCurr(item){
  try {
    await deleteDoc(doc(db, "events", item.id));  
    message.success("Elemento eliminato correttamente!");
  } catch (e) {
    message.error("Non è possbile eliminare l'elemento :(");
  }
}

const modalOpen = ref(false)

function onToggleModal(){
  modalOpen.value = !modalOpen.value;
}

/**
 * Funzione injected nella modale per poter effettuare 
 * Fatto in questo modo perché non volevo gestire le complicazioni extra del framework
 * @param payload 
 */

async function onSubmitModal(payload){
  
  modalOpen.value = false;
  
  const currEvent = new EventDTO(payload);
  currEvent.userId = currentUser.value.uid;
  console.log(currEvent.toObject())
  try {
    await addDoc(collection(db, "events"), currEvent.toObject());
    message.success("Evento inserito correttamente!");
  } catch (e) {
    console.log('error', e);
    message.error("C'è qualcosa non va :(");
  }

}

const hashTypeActivity = new Map();

const getListData = calendarDate => {

  /**
   *  Sto utilizzando la distanza tra due punti per non avere un controllo eccessivo di if
   *  Sto verificando quale elemento ha una distanza "accettabile" rispetto alla data di quel giorno
   *  Conversione da ms in ore perché più facile effettuare un effettivo offset
   */
  try {
    let currEvent, p, q;
    const list = []
    
    hashTypeActivity.set(calendarDate.$d.getTime(), new Set());
    for(let i = 0; i< currEvents.value.length; i++){
      currEvent = currEvents.value[i];  

      p = new Date(currEvent.timestamp.toDate().getFullYear(), currEvent.timestamp.toDate().getMonth(),currEvent.timestamp.toDate().getDate());
    
      q = new Date(new Date(calendarDate.$d).getFullYear(), new Date(calendarDate.$d).getMonth(),new Date(calendarDate.$d).getDate());

      let distance = p.getTime() - q.getTime();
      distance = distance*2.77778e-7;
      if(distance >= 0 && distance < 24 ){
        
        hashTypeActivity.get(calendarDate.$d.getTime()).add(currEvent.category);

        list.push(currEvent)
      }
    }
    return list;
  } catch (e) {
    console.error(e)
    return [];
  }
  
 
};

const activities = computed(() => {
  return getListData(date.value);
});

const onPanelChange = (value) => {
  date.value = value;
};

</script>

<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 84px;
  overflow-y: hidden; 
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
</style>