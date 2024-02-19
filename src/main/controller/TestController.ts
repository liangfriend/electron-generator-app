import { ipcMain } from "electron";

class TestController{
    testService
    constructor(data) {

       
        this.testService=data.testService
        //
        this.init()
    }
    init() {
        this.test()
    }
    test() {
        ipcMain.handle("test", ()=>{
            this.testService.test()
        })
    }
}
export default TestController