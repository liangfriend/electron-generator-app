import { createFile } from "@/main/utils/common"
import path from "path"


export default function generator(config) {
    
     //
    const content = source(config)
    const fileName = 'index.ts'
    const generatorPath = config.targetPath + config.name + '/src/preload/'
    createFile(fileName,content,generatorPath)
 

}
function dynaminImport(config) {
    const data=config.data
    let result = ''
    data.forEach(item => {
        const key=item.key
        const str = `import ${key}Api from './group/${key}Api'\n`
        result=result+str
    })
    return result
}
function dynamicMerge(config) {
  const data = config.data
      let result = ''
    data.forEach(item => {
        const key=item.key
        const str = `...${key}Api,`
        result=result+str
    })
    return result
}
function source(config) {
         const source = {
             template:`
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
${dynaminImport(config)}
const api={${dynamicMerge(config)}}
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    console.log(api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
`
        }
        return source.template
    }