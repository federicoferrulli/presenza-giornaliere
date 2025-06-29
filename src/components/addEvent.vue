
<template>
  
  <a-drawer :width="500" :title="payload?.title ? payload.title: ''" :placement="isLargeScreen ? 'right' : 'bottom'" :open="open" @close="onClose">
    <template #extra>
      <a-button style="margin-right: 8px" @click="onClose">Annulla</a-button>
      <a-button type="primary" @click="onSubmit">Salva</a-button>
    </template>
   
    <a-select
      ref="select"
      v-model:value="newPayload.type"
      style="width: 120px"
    >
      <template v-for="category in types" >
        <a-select-option :value="category.id">{{ category.value }}</a-select-option>
      </template>
    </a-select>
    <a-time-picker v-model:value="strValue" value-format="HH:mm:ss"  />
    <a-time-picker v-model:value="strValue" value-format="HH:mm:ss" />
  </a-drawer>

</template>

<script setup>
import { ref, defineProps, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useResponsiveStore } from '@/states/responsive.state.js';


const types = [
  {id: 1, value: 'Attività'},
  {id: 2, value: 'Ferie'},
  {id: 3, value: 'Malattia'},
  {id: 4, value: 'Festività'},
  {id: 5, value: 'Donazione/Elezione'},
  {id: 6, value: 'Sciopero'},
  {id: 7, value: 'Legge 104'},
  {id: 8, value: 'Lutto'}
]

const responsiveStore = useResponsiveStore();
const { isLargeScreen } = storeToRefs(responsiveStore);

const newPayload = reactive({})

const strValue = ref('09:00:00');




defineProps({
  onClose: Function,
  onSubmit: Function,
  title: String,
  open: Boolean,
  payload: Object
})

</script>