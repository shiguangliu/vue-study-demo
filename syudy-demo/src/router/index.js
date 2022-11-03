import {createRouter,createWebHashHistory} from 'vue-router'

const routers = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'about',
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes:routers,
})

export default router