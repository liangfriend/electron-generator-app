import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

export const routes: Array<RouteRecordRaw>  = [
  {
    path: '/',
    redirect: '/student'
  }
]
   
    // 导入 ./modules 下的所有 router.ts 文件
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const routeModules: any = import.meta.glob('./views/**/*.router.ts',{eager:true});
 
    for (const path in routeModules) {
        const module = routeModules[path];
        routes.push(...module.default);
    }
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
