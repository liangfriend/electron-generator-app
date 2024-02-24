import { AwilixContainer } from "awilix";
import { ipcMain } from "electron";

class GeneratorController {
    
    generatorService
    constructor(data:any) {
        this.generatorService = data.generatorService;
        this.init();
    }

    init() {
        //
       this.generatorStart()
    }
    generatorStart():void {
        ipcMain.handle('generatorStart', (event,data) => {
       
            this.generatorService.generatorStart(data)
        })
        
    }
 
}

export default GeneratorController;
