import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [    
    {
      path: '/',
      name: 'index', 
      component:()=>import('@/views/index.vue')
    }
  ]
})

export default router
