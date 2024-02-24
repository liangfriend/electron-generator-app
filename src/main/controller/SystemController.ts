import { ipcMain } from "electron";

class SystemController {
    systemService
    constructor(data:any) {
        this.systemService = data.systemService;
        this.init();
    }

    init() {
        //
        this.getPath()
        this.getFileContent()
    }
    getPath() {
        ipcMain.handle('getPath',  (event) => {
            return  this.systemService.getPath()
        })
    }
    getFileContent() {
        ipcMain.handle('getFileContent',  (event) => {
            return  this.systemService.getFileContent()
        }) 
    }
 
}

export default SystemController;
