import { createRouter, createWebHashHistory } from 'vue-router'

const Trade = () => import("./Trade.vue")

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: "Trade",
            path: "/",
            component: Trade
        },
    ]
})
