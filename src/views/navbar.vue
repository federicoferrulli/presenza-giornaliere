<template>
    <div class="logo">
        
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item @click="logout" key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
    </a-menu>
</template>

<style scoped>
</style>

<script setup>
const selectedKeys = ['1']
import {
    signOut
} from 'firebase/auth'
import { 
    useFirebaseAuth, 
} from 'vuefire'

import { 
    useRouter 
} from 'vue-router';



const router = useRouter();
const auth = useFirebaseAuth();

async function logout(){
	await signOut(auth)
    router.push({
        
        name: 'login'

    })
}

</script>
