<template>
  <addEvent :title="'Nuova attività'" :currDate="date" :onClose="onToggleModal" :onSubmit="onSubmitModal" :open="modalOpen" ></addEvent>
  <div class="p-4">
    <div class="flex flex-col lg:flex-row gap-4">
      <div class="flex-1 min-w-0">
        <a-calendar :locale="objLang" v-model:value="date" :fullscreen="isLargeScreen" @change="onPanelChange" @panelChange="onPanelChange">
          <template #dateCellRender="{ current }">
            <ul class="events">
              <a-badge v-if="getListData(current).length > 0" :status="'warning'" class="w-full" />
            </ul>
          </template>
        </a-calendar>
      </div>
      
      <div class="w-full lg:w-150 flex-shrink-0">
        <a-list bordered :data-source="activities">
          <template #header>
            <div class="flex justify-between">
              <div>Attività del {{ date.format('DD-MM-YYYY') }}</div>
              <div>
                <a-button @click="onToggleModal" shape="circle">+</a-button>
              </div>  
            </div>
          </template>
          <template #renderItem="{ item }">
            <a-list-item>
              <a-badge :status="item.type" :text="item.content" />
            </a-list-item>
          </template>
        </a-list>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import addEvent from '@/components/addEvent.vue';
import 'dayjs/locale/it';
import { storeToRefs } from 'pinia';

import { useResponsiveStore } from '@/states/responsive.state.js';

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

const modalOpen = ref(false)

function onToggleModal(){
  modalOpen.value = !modalOpen.value;
}

function onSubmitModal(){
  modalOpen.value = false;
}


const getListData = value => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'Lavoro su Progetto X.' },
        { type: 'success', content: 'Meeting con il team.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'Scadenza Progetto Y.' },
        { type: 'success', content: 'Review performance.' },
        { type: 'error', content: 'Fix bug critico.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'Preparazione demo.' },
        { type: 'success', content: 'Evento aziendale molto lungo e importante...' },
      ];
      break;
    default:
  }
  return listData || [];
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