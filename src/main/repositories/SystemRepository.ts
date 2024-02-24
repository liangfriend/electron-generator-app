import { Op } from "sequelize";
import { queryData } from "../utils/query";
import { app, dialog } from "electron";
import { getWindow } from "../utils/windowManager";
import { copyDirectoryWithProgress, copyFileWithProgress, openDirectoryDialog, openFileDialog } from "../utils/common";
import path from "path";

class SystemRepository {
    
    constructor(data:any) {
        //
    }

     getPath() {
        const win=getWindow('main')
        const targetPath =  openDirectoryDialog(win)
        return targetPath
    
    }
     getFileContent() {
        const win=getWindow('main')
        const content =  openFileDialog(win, {})
        console.log(content)
        return content
    }
}

export default SystemRepository;
