
<template>
  <a-drawer :width="'30%'" :height="'90%'"  :title="title" :placement="isLargeScreen ? 'right' : 'bottom'" :open="open" @close="resetForm">
    <!-- <template #extra>
      <a-button style="margin-right: 8px" @click="onClose">Annulla</a-button>
      <a-button type="primary" @click="onSubmit">Salva</a-button>
    </template> -->
    
    <a-form ref="formRef" layout="vertical" :model="newPayload">
      
      <a-form-item label="Categoria"  name="type" v-bind="{rules: [{ type: 'number', required: true, message: 'Seleziona categoria!'}]}" >
          <a-select
            ref="select"
            v-model:value="newPayload.type"
            @change="onCategoryChange"
            style="width: 120px"
          >
            <template v-for="category in types" >
              <a-select-option :value="category.id">{{ category.value }}</a-select-option>
            </template>
          </a-select>
      </a-form-item>

      <a-form-item  name="dateStart" label="Ora di inizio" v-bind="{rules: [{ type: 'string', required: !differentType, message: 'Seleziona la data di inizio!' }]}">
        <a-time-picker v-model:value="newPayload.dateStart" value-format="HH:mm:ss"  :disabled="differentType" />
      </a-form-item>

      <a-form-item  name="dateEnd" label="Ora di fine" v-bind="{rules: [{ type: 'string', required: !differentType, message: 'Seleziona la data di fine!' }]}">
        <a-time-picker v-model:value="newPayload.dateEnd" value-format="HH:mm:ss" :disabled="differentType" />
      </a-form-item>
      
      <a-form-item label="Durata (Ore)" v-if="!differentType">
        <div>
          {{ 
            (!isNaN(getDuration(
              new Date(new Date(currDate).toISOString().split('T')[0] +' '+newPayload.dateEnd), 
              new Date(new Date(currDate).toISOString().split('T')[0] +' '+ newPayload.dateStart), 
              'h'
            )) ? getDuration(
              new Date(new Date(currDate).toISOString().split('T')[0] +' '+newPayload.dateEnd), 
              new Date(new Date(currDate).toISOString().split('T')[0] +' '+ newPayload.dateStart), 
              'h'
            ) :'0')
          }}
        </div>
      </a-form-item>
      
      <a-form-item>
         <a-button style="margin-right: 8px" @click="resetForm">Annulla</a-button>
         <a-button type="primary" :loading="loading" @click="submitForm">Salva</a-button>
      </a-form-item>
    </a-form>
  </a-drawer>

</template>

<script setup>
import { defineProps, reactive, toRaw, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useResponsiveStore } from '@/states/responsive.state.js';

import { message } from 'ant-design-vue';

const differentType = ref(true); 
let loading = ref(false); 

const formRef = ref();
const types = [
  {id: null, value: '--'},
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

const props = defineProps({
  onClose: Function,
  onSubmit: Function,
  title: String,
  open: Boolean,
  currDate: [Object, Date],
})

function resetForm(){
  formRef.value.resetFields();
  props.onClose();
  newPayload = reactive({
    dateStart: '',
    dateEnd: '',
    type: null,
  })
  differentType.value = true;
}

async function submitForm(){
  loading.value = true;
  try{

    try {
      await formRef.value.validate()
    } catch (e) {
      return;  
    }
   

    let duration = getDuration(
      new Date(new Date(props.currDate).toISOString().split('T')[0] +' '+newPayload.dateEnd), 
      new Date(new Date(props.currDate).toISOString().split('T')[0] +' '+ newPayload.dateStart), 
      'ms'
    )
    props.onSubmit({...toRaw(newPayload), currDate: props.currDate, duration})
    formRef.value.resetFields();
    newPayload = reactive({
      dateStart: '',
      dateEnd: '',
      type: null,
    })
    
  }catch(e){
    console.log('error', e);
    message.error("C'è qualcosa non va :(");
  }finally{
    loading.value = false;
  }

}

function getDuration(dateInit, dateEnd, unit){
  try {
    

    if(typeof unit != 'string' || !(['ms', 's', 'm', 'h', 'd'].includes(unit))){
      return '-';
    }

    if(!dateInit){
      return '-';
    }

    
    if(!dateEnd){
      return '-';
    }


    let ms = Math.abs(new Date(dateEnd) - new Date(dateInit));

    if(ms == NaN){
      return '-'
    }

    if(unit == 'ms'){
      return ms
    }else if(unit == 's'){
      return ms / 1_000;
    }else if(unit == 'm'){
      return ms / 60_000;
    }else if(unit == 'h'){
      return ms / 3_600_000;
    }else if(unit == 'd'){
      return ms / 86_400_000;
    }else{
      return '-';
    }
  } catch (e) {
    return '-'
  }


}


function onCategoryChange(){
  
  if(newPayload.type!=1){
    differentType.value = true;
    newPayload.dateStart = '00:00:00';
    newPayload.dateEnd = '00:00:00';
    return;
  }
  
  differentType.value = false;
}

let newPayload = reactive({
  dateStart: '',
  dateEnd: '',
  type: null,
})

</script>