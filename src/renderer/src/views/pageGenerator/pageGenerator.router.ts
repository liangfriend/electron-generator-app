import { createRouter, createWebHashHistory } from 'vue-router'
import index from './index.vue'
const routes = [
  {
    path: '/pageGenerator',
    redirect:"/pageGenerator/index",
    name: "pageGenerator",
    meta:{name:"页面生成",key:"pageGenerator"},
    children: [{
      path: '/pageGenerator/index',
      component: index,
    }]
    },
   
]

export default routes
