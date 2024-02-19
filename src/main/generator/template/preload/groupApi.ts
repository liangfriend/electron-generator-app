import { createFile } from "@/main/utils/common"
import path from "path"


export default function generator(config) {
    
    config.data.forEach(item => {
    const fileName=item.key+'Api.ts'
    const content = source(item.Key,item.key)
    const generatorPath = config.targetPath + config.name + '/src/preload/group/'
    console.log('groupApi目录', generatorPath,)
    console.log('groupApi名称',fileName,)
    createFile(fileName,content,generatorPath)
    })

}
function source(Key, key) {
         const source = {
             template:`
import { ipcRenderer } from "electron"

const ${key}Api = {
    create${Key}: async (data): Promise<boolean> => {
      return await ipcRenderer.invoke('create${Key}',data)
    },
    getAll${Key}s: async (data): Promise<Array<object>> => {
      return await ipcRenderer.invoke('getAll${Key}s',data)
    },
    get${Key}ById: async (id): Promise<boolean> => {
      return await ipcRenderer.invoke('get${Key}ById',id)
    },
    update${Key}ById: async (id,data): Promise<boolean> => {
      return await ipcRenderer.invoke('update${Key}ById',id,data)
    },
    delete${Key}ById: async (id): Promise<boolean> => {
      return await ipcRenderer.invoke('delete${Key}ById',id)
    },
  
}
export default ${key}Api`
        }
        return source.template
    }