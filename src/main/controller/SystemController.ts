import { ipcMain } from "electron";

class SystemController {
    systemService
    constructor(data) {
        this.systemService = data.systemService;
        this.init();
    }

    init() {
        //
        this.getPath()
    }
    getPath() {
        ipcMain.handle('getPath', (event) => {
            return this.systemService.getPath()
        })
    }
 
}

export default SystemController;
