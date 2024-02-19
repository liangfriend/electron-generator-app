import { createRouter, createWebHashHistory } from 'vue-router'
import index from './index.vue'
const routes = [
  {
    path: '/projectGenerator',
    redirect:"/projectGenerator/index",
    name: "projectGenerator",
    meta:{name:"项目生成",key:"projectGenerator"},
    children: [{
      path: '/projectGenerator/index',
      component: index,
    }]
    },
   
]

export default routes
