import { Op } from "sequelize";
import { queryData } from "../utils/query";
import { app, dialog } from "electron";
import { getWindow } from "../utils/windowManager";
import { copyDirectoryWithProgress, copyFileWithProgress, openDirectoryDialog, openFileDialog } from "../utils/common";
import path from "path";
import generatorStart from "../generator/generator-start";


class GeneratorRepository {
    
    constructor(data) {
     //
    }
    //这个参数应该只有config
    generatorStart(config,callback) {
        // const p = path.join(__dirname, '/src/main/generator/' + templateName + '/config/generator-start.ts')
        console.log("传入repository",config)
        //这里传进来的路径做一些操作后才是传到generatorStart中的config
        generatorStart(config,callback)
    }

}

export default GeneratorRepository;
