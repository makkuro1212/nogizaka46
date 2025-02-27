import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/diary/:romaji/',
      name: 'diary',
      component: () => import('../views/DiaryView.vue'),
    },
    { path: '/:pathMatch(.*)', component: () => import('../views/NotFoundView.vue') },
  ],
})

export default router
