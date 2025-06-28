
<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <a-card
            :bordered="false"
            class="w-full max-w-xs sm:max-w-sm shadow-xl rounded-lg"
            :headStyle="{ borderBottom: 'none', textAlign: 'center', padding: '2rem 1rem' }"
        >
            <template #title>
                <a-typography-title :level="4" class="!mb-0">
                    Accedi
                </a-typography-title>
            </template>
            <a-flex justify="center" align="center" vertical gap="large">
                <a-button
                    size="large"
                    :icon="h(GoogleOutlined)"
                    class="w-full"
                    @click="signIn"
                    :disabled="loading"
                    :loading="loading"
                >
                    Continua con Google
                </a-button>

                <div v-if="error" class="text-center">
                    <a-typography-text type="danger">
                        Accesso fallito. Per favore, riprova.
                    </a-typography-text>
                </div>
            </a-flex>
        </a-card>
    </div>
</template>

<style scoped>  
</style>

<script setup>

import { h } from 'vue';
import { GoogleOutlined } from '@ant-design/icons-vue'
import {
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'

import { 
    useFirebaseAuth, 
} from 'vuefire'

import { useRouter } from 'vue-router';

const router = useRouter();
let loading = false;
let error = null;
const auth = useFirebaseAuth()

async function signIn() {
   
    const provider = new GoogleAuthProvider();
    loading = true;
    try {
        await signInWithPopup(auth, provider)
        router.push({
            name: 'homepage',
        })
    } catch (e) {
        console.log(e)
        error = e;
    } finally {
        loading = false;
    }
}

</script>
