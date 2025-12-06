import HomeView from "@/pages/HomeView.vue";
import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home-view",
            component: HomeView
        }
    ],
})

export default router
