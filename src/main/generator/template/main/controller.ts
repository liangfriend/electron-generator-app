import { createFile } from "@/main/utils/common"
import path from "path"


export default function generator(config) {
    
    config.data.forEach(item => {
        const fileName=item.key+'Controller.ts'
    const content = source(item.Key,item.key)
    const generatorPath = config.targetPath + config.name + '/src/main/controller/'
    console.log('controller目录', generatorPath,)
     console.log('controller名称',fileName,)
    createFile(fileName,content,generatorPath)
    })

}
function source(Key, key) {
         const source = {
    template:`import { ipcMain } from "electron";

class ${Key}Controller {
    ${key}Service
    constructor(data) {
        this.${key}Service = data.${key}Service;
        this.init();
    }

    init() {
        
        this.create${Key}();
        this.getAll${Key}s();
        this.get${Key}ById();
        this.update${Key}ById();
        this.delete${Key}ById();
    }

    create${Key}() {

        ipcMain.handle("create${Key}", async (event,data) => {
            try {
                const ${key} = await this.${key}Service.create${Key}(data);
                return ${key};
            } catch (error) {
                console.error("Error creating ${key}:", error);
                throw error;
            }
        });
    }

    getAll${Key}s() {
       
        ipcMain.handle("getAll${Key}s", async (event,data) => {
            try {
                const ${key}s = await this.${key}Service.getAll${Key}s(data);
                return ${key}s;
            } catch (error) {
                console.error("Error getting all ${key}s:", error);
                throw error;
            }
        });
    }

    get${Key}ById() {
        ipcMain.handle("get${Key}ById", async (event, id) => {
            try {
                const ${key} = await this.${key}Service.get${Key}ById(id);
                return ${key};
            } catch (error) {
                console.error(\`Error getting ${key} with id \${id}:\`, error);
                throw error;
            }
        });
    }

    update${Key}ById() {
        ipcMain.handle("update${Key}ById", async (event, id, data) => {
            console.log("进入，",id,data)
            try {
                const updated${Key} = await this.${key}Service.update${Key}ById(id, data);
                return updated${Key};
            } catch (error) {
                console.error(\`Error updating ${key} with id \${id}:\`, error);
                throw error;
            }
        });
    }

    delete${Key}ById() {
        ipcMain.handle("delete${Key}ById", async (event, id) => {
            try {
                const isDeleted = await this.${key}Service.delete${Key}ById(id);
                return isDeleted;
            } catch (error) {
                console.error(\`Error deleting ${key} with id \${id}:\`, error);
                throw error;
            }
        });
    }
}

export default ${Key}Controller;
`
        }
        return source.template
    }