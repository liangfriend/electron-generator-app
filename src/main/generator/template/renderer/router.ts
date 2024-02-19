import { createFile } from "@/main/utils/common"
import path from "path"


export default function generator(config) {
    
     //
    const key = config.data?.[0]?.key

    const content = source(key)
    const fileName = 'router.ts'
    const generatorPath = config.targetPath + config.name + '/src/renderer/src/'
      console.log('router目录', generatorPath,)
     console.log('router名称',fileName,)
    createFile(fileName,content,generatorPath)

}

function source(key) {
         const source = {
             template:
             `import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

export const routes: Array<RouteRecordRaw>  = [
  {
    path: '/',
    redirect: '/${key}'
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

`
        }
        return source.template
    }