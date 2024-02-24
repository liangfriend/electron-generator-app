import { createRouter, createWebHashHistory } from 'vue-router'
import index from './index.vue'
const routes = [
  {
    path: '/introduce',
    redirect:"/introduce/index",
    name: "introduce",
    meta:{name:"介绍",key:"introduce"},
    children: [{
      path: '/introduce/index',
      component: index,
    }]
    },
   
]

export default routes
