<template>
    <div class="logo" @click="goHome"></div>
    <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">

        <a-menu-item @click="logout" :icon="h(LogoutOutlined)" key="2">
            Disconnetti
        </a-menu-item>
    </a-menu>
</template>

<style scoped>
    .logo {
        
        width: 120px;
        height: 31px;
        /* background: rgba(255, 255, 255, .08);  */
        margin: 16px 24px 16px 0;
        float: left;
        background-image: url('/logo_no_bg_invert.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size:cover;
        cursor: pointer;
    }
</style>

<script setup>
const selectedKeys = ['1']
import { h } from 'vue';
import {
    signOut
} from 'firebase/auth'

import {
    LogoutOutlined
} from '@ant-design/icons-vue'

import { 
    useFirebaseAuth, 
} from 'vuefire'

import { 
    useRouter 
} from 'vue-router';



const router = useRouter();
const auth = useFirebaseAuth();

function goHome(){
    router.push({
        name: 'homepage'
    })
}


async function logout(){
	await signOut(auth)
    router.push({
        
        name: 'login'

    })
}

</script>
