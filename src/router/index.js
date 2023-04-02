import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Cartouche from '../views/Cartouche.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Cartouche/:id',
      name: 'cartouche',
      component: Cartouche
      
    },
  ]
});

export default router
