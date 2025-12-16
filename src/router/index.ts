import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home-view",
            component: () => import('@/pages/HomeView.vue')
        },
        {
            path: "/graphs",
            name: "graph-view",
            component: () => import('@/pages/GraphView.vue')
        },
        {
            path: "/auth/login",
            name: "login-view",
            component: () => import('@/pages/LoginView.vue')
        }
    ],
})

export default router
