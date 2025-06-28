<template>
	<a-layout class="h-dvh">
		<a-layout-header v-if="currentUser">
			<navbar></navbar>
		</a-layout-header>
		<a-layout-content class="h-dvh">
			<RouterView></RouterView>
		</a-layout-content>
	</a-layout>
</template>

<style scoped>
</style>

<script setup>
import { useCurrentUser } from 'vuefire'
import navbar from '@/views/navbar.vue'
const currentUser = useCurrentUser()
</script>
