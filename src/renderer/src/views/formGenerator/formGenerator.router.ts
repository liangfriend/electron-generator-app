import { createRouter, createWebHashHistory } from 'vue-router'
import index from './index.vue'
const routes = [
  {
    path: '/formGenerator',
    redirect:"/formGenerator/index",
    name: "formGenerator",
    meta:{name:"表单生成",key:"formGenerator"},
    children: [{
      path: '/formGenerator/index',
      component: index,
    }]
    },
   
]

export default routes
