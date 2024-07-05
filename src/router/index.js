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
      component:()=>import('@/components/flowOpt/flowConfList.vue')
    },{
      path: '/approve',
      name: 'approve', 
      component:()=>import('@/components/flowOpt/approve.vue')
    },
    {
      path: '/todo',
      name: 'todo', 
      component:()=>import('@/components/flowOpt/todoList.vue')
    },
    {
      path: '/demo1',
      name: 'demo1', 
      component:()=>import('@/components/BusinessDemo/demo1.vue')
    },
  ]
})

export default router
