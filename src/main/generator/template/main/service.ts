import { createFile } from "@/main/utils/common"
import path from "path"


export default function generator(config) {
    
    config.data.forEach(item => {
        const fileName=item.key+'Service.ts'
    const content = source(item.Key,item.key)
    const generatorPath = config.targetPath + config.name + '/src/main/service/'
    console.log('Service目录', generatorPath,)
     console.log('Service名称',fileName,)
    createFile(fileName,content,generatorPath)
    })

}
function source(Key, key) {
         const source = {
             template:`
class ${Key}Service {
    ${key}Repository
    constructor(data) {
        this.${key}Repository = data.${key}Repository;
    }

    async create${Key}(data) {
        try {
            const ${key} = await this.${key}Repository.create${Key}(data);
            return ${key};
        } catch (error) {
            console.error('Error creating ${key}:', error);
            throw error;
        }
    }

    async getAll${Key}s(data) {
        try {
            const ${key}s = await this.${key}Repository.getAll${Key}s(data);
            return ${key}s;
        } catch (error) {
            console.error('Error getting all ${key}s:', error);
            throw error;
        }
    }

    async get${Key}ById(id) {
        try {
            const ${key} = await this.${key}Repository.get${Key}ById(id);
            return ${key};
        } catch (error) {
            console.error(\`Error getting ${key} with id \${id}:\`, error);
            throw error;
        }
    }

    async update${Key}ById(id, data) {
        try {
            const updated${Key} = await this.${key}Repository.update${Key}ById(id,data);
            return updated${Key};
        } catch (error) {
            console.error(\`Error updating ${key} with id \${id}:\`, error);
            throw error;
        }
    }

    async delete${Key}ById(id) {
        try {
            const isDeleted = await this.${key}Repository.delete${Key}ById(id);
            return isDeleted;
        } catch (error) {
            console.error(\`Error deleting ${key} with id \${id}:\`, error);
            throw error;
        }
    }
}

export default ${Key}Service;


`
        }
        return source.template
    }