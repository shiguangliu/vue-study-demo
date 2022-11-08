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
        path: '/home', // 布局页
        name: 'home',
        component: () => import('../views/home/index.vue'),
        children:[
            {
                path: '/index',
                name: 'index',
                component: () => import('../views/home/index/index.vue')
            },
            {
                path: '/static',
                name: 'static',
                component: () => import('../views/home/static/index.vue')
            },
            {
                path: '/wms',
                name: 'wms',
                component: () => import('../views/home/wms/index.vue'),
                children: [
                    {
                        path: '/wms/list',
                        name: 'wmsList',
                        component: () => import('../views/home/wms/list.vue')
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes:routers,
})

export default router