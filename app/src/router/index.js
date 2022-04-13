import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/hash',
    component: () => import('../views/HashPage.vue')
  },
  {
    path: '/block',
    component: () => import('../views/BlockPage.vue')
  },
  {
    path: '/chain',
    component: () => import('../views/ChainPage.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
