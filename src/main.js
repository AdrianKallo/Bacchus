import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createPinia } from 'pinia';

import './style.css';
import Buefy from '@ntohq/buefy-next';
import '@ntohq/buefy-next/dist/buefy.css';

import App from './App.vue';
import Home from './pages/Home.vue';

const routes = [
    { path: '/', component: Home },
];

const router = createRouter({
    history: createWebHashHistory(), // Use hash mode for development
    routes,
});

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(Buefy);
app.use(pinia);
app.mount('#app');
