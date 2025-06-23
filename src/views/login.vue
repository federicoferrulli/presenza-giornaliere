
<template>
    <a-card 
        :bordered="true" 
        class=""
        headStyle="border-bottom:none;text-align:center;padding: 3em;"
    >
        <template #title>
            <a-typography-title :level="4">
                Entra con
            </a-typography-title>
        </template>
        <a-flex justify="center" align="center">
            <a-button 
                shape="large" 
                :icon="h(GoogleOutlined)" 
                style="height: 4em;width: 100%;"
                @click="AuthState.redirectSign"
                :loading="AuthState.loading['redirectSign']"
            >
            </a-button>
            
        </a-flex>
        <div v-if="AuthState.error['redirectSign']">
            <a-typography-text type="danger">
                Errore nella login
            </a-typography-text>
        </div>
    </a-card>
 
</template>

<style scoped>  

</style>
<script setup>

import { h, onMounted } from 'vue';
import { useAuthState } from '@/states/auth.state'
import { GoogleOutlined } from '@ant-design/icons-vue'

const AuthState = useAuthState()

onMounted(async () => {
    await AuthState.getRedirectSign()
})


</script>
