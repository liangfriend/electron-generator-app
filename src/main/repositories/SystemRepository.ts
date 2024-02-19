import { Op } from "sequelize";
import { queryData } from "../utils/query";
import { app, dialog } from "electron";
import { getWindow } from "../utils/windowManager";
import { copyDirectoryWithProgress, copyFileWithProgress, openDirectoryDialog, openFileDialog } from "../utils/common";
import path from "path";

class SystemRepository {
    
    constructor(data) {
        //
    }

    async getPath() {
        const win=getWindow('main')
        const targetPath = await openDirectoryDialog(win)
        return targetPath
    
    }

}

export default SystemRepository;
