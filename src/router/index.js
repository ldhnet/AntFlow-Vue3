import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [    
    {
      path: '/',
      name: 'index', 
      component:()=>import('@/views/index.vue')
    },{
      path: '/setting',
      component:()=>import('@/views/setting.vue')
    }, {
      path: '/flowconf',
      name: 'flowconf', 
      component:()=>import('@/components/WorkFlowConfList.vue')
    },
    {
      path: '/todo',
      name: 'todo', 
      component:()=>import('@/components/Todo.vue')
    }
  ]
})

export default router
