import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import UserLogin from './views/UserLogin.vue'
import Home from './views/Home.vue'
import VotePage from './views/VotePage.vue';
import CandidateDetails from './views/CandidateDetails.vue';
import Confirmation from './views/Confirmation.vue';
const routes = [
    { path: "/", component: UserLogin },
    { path: "/login", component: UserLogin },
    { path: "/home", component: Home },
    { path: '/vote', component: VotePage },
    { path: '/candidate/:id', component: CandidateDetails },
    { path: '/confirmation', component: Confirmation },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app')
