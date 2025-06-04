import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';
import App from './App.vue';
import UserLogin from './views/UserLogin.vue';
import Otp from './views/Otp.vue';
import Home from './views/Home.vue';
import VotePage from './views/VotePage.vue';
import CandidateDetails from './views/CandidateDetails.vue';
import Confirmation from './views/Confirmation.vue';

const routes = [
    { path: "/", component: UserLogin, name: 'Login' },
    { path: "/otp", component: Otp, name: 'Otp' },
    { path: "/home", component: Home, name: 'Home' },
    { path: '/vote', component: VotePage, name: 'VotePage' },
    { path: '/candidate/:id', component: CandidateDetails, name: 'CandidateDetails' },
    { path: '/confirmation', component: Confirmation, name: 'Confirmation' },
];

const router = createRouter({
    history: createWebHistory(),  // ใช้ history mode
    routes,
});

createApp(App).use(router).mount('#app');  // สร้าง Vue app และ mount ให้ถูกต้อง
