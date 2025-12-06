import HomeView from "@/pages/HomeView.vue";
import GraphView from "@/pages/GraphView.vue";
import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home-view",
            component: HomeView
        },
        {
            path: "/graphs",
            name: "graph-view",
            component: GraphView
        }
    ],
})

export default router
