<template>
	<a-layout class="h-dvh">
		<a-layout-header v-if="AuthState.isLoggedIn">
			<div class="logo"></div>
			<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
				<a-menu-item key="1">nav 1</a-menu-item>
				<a-menu-item key="2">nav 2</a-menu-item>
				<a-menu-item key="3">nav 3</a-menu-item>
			</a-menu>

		</a-layout-header>
		<a-layout-content class="h-dvh">
			<RouterView></RouterView>
		</a-layout-content>
	</a-layout>
</template>

<style scoped>
</style>

<script setup>
import { ref, watch } from 'vue';
import { useAuthState } from '@/states/auth.state'
const AuthState = useAuthState()

watch(AuthState.user, async (currentUser, previousUser) => {

	if (!currentUser && previousUser && route.meta.auth !== false) {
		return router.push({ name: 'login' })
	}

	if (currentUser && typeof route.query.redirect === 'string') {
		return router.push(route.query.redirect)
	}

})

</script>
