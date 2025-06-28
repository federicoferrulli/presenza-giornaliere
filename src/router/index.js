import { createRouter, createWebHistory } from 'vue-router'

import { getCurrentUser } from 'vuefire'


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
            name: 'homepage',
            component: () => import('@/views/homepage.vue'),
        },
    ],

})

router.beforeEach(async (to, from, next) => {

    const currentUser = await getCurrentUser();

   
    if (to.meta.auth === false && !currentUser) {
        next();
        return false;
    }

    if (!currentUser) {

        next({
            name: 'login',
        })

        return;
    }
    
    if(currentUser && to.name === 'login'){
        next({
            name: 'homepage',
        })
        return;
    }

    next();
})


export default router
