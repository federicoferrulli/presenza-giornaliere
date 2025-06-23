import { createRouter, createWebHistory } from 'vue-router'
import { useAuthState } from '@/states/auth.state'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            meta: {
                auth: false
            },
            component: () => import('@/views/login.vue'),
        },
        {
            path: '/',
            name: 'home',
            // component: homepage,
        },
    ],

})

router.beforeEach(async (to, from, next) => {

    const AuthState = useAuthState()

    if (to.meta.auth === false) {
        next();
        return false;
    }

    if (!AuthState.isLoggedIn && to.name != 'login') {

        next({
            name: 'login',
            query: {
                redirect: to.fullPath,
            }
        })

        return;
    }

    next();
})


export default router
