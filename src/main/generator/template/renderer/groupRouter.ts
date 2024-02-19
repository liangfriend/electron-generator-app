import { createFile } from "@/main/utils/common"


export default function generator(config) {
    
    
    config.data.forEach(item => {
        const key = item.key
        const Key = item.Key
        const name=item.name
        const fileName=key+'.router.ts'
    const content = source(Key,key,name)
        const generatorPath = config.targetPath + config.name + '/src/renderer/src/views/'
            + key + '/'
    console.log('groupRouter目录', generatorPath,)
     console.log('groupRouter名称',fileName,)
    createFile(fileName,content,generatorPath)
    })

}

function source(Key,key,name) {
         const source = {
             template:`
import { createRouter, createWebHashHistory } from 'vue-router'
import index from './index.vue'
const routes = [
  {
    path: '/${key}',
    redirect:"/${key}/index",
    name: "${key}",
    meta:{name:"${name}",key:"${key}"},
    children: [{
      path: '/${key}/index',
      component: index,
    }]
    },
   
]

export default routes

`
        }
        return source.template
    }