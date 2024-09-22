import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClickThroughRate from '../views/ClickThroughRate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ClickThroughRate
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/django',
      name: 'django',
      component: () => import('../views/DjangoView.vue')
    },
    {
      path: '/djangotest',
      name: 'djangotest',
      component: () => import('../views/AnotherDjango.vue')
    },
    {
      path: '/ctr',
      name: 'CTR',
      component: () => import('../views/ClickThroughRate.vue')
    },
    {
      path: '/advclicks',
      name: 'clicks',
      component: () => import('../views/AdSpendVsClicks.vue')
    },

  ]
})

export default router
