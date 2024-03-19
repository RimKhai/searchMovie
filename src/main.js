import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from 'src/App.vue'
import MainPage from 'src/components/pages/MainPage.vue'
import MarkerPage from 'src/components/pages/MarkerPage.vue'
import MoviePage from 'src/components/pages/MoviePage.vue'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    iconfont: 'mdi',
})

const pinia = createPinia()

const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/movie',
        component: MoviePage,
    },
    {
        path: '/markers',
        component: MarkerPage,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).use(vuetify).use(pinia).mount('#app')
