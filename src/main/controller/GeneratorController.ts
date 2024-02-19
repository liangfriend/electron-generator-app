import { ipcMain } from "electron";

class GeneratorController {
    generatorService
    constructor(data) {
        this.generatorService = data.generatorService;
        this.init();
    }

    init() {
        //
       this.generatorStart()
    }
    generatorStart() {
        ipcMain.handle('generatorStart', (event,data) => {
       
            this.generatorService.generatorStart(data)
        })
        
    }
 
}

export default GeneratorController;
