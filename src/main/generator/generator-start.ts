import path from "path"

import { copyDirectoryWithProgress, createFile } from "@/main/utils/common";

import { templateMainMap,templatePreloadMap,templateRendererMap } from "./template/templateContainer";
import { app } from "electron";
// 0000

type p = {
    sourcePath: string,
    targetPath: string,
    fileName: string,
    key: string,
    Key:string,
}
export default async  function generatorStart(config,callback) {
    const targetDir = config.targetPath + config.name
    const sourceDir = path.join(app.getAppPath(), config.projectTemplateType)
    //模版迁移
    await copyDirectoryWithProgress(sourceDir, targetDir, callback)
    templateMainMap.get(config.mainTemplateType).forEach(generator => {
        generator(config)
    })
    templatePreloadMap.get(config.preloadTemplateType).forEach(generator => {
        generator(config)
    })
 
    templateRendererMap.get(config.rendererTemplateType).forEach(generator => {
        generator(config)
    })
     

}
