import { createFile } from "@/main/utils/common"
import path from "path"


export default function generator(config) {
    
    config.data.forEach(item => {
        const fileName = item.key + 'Repository.ts'
          const primaryKey=item.column.find(item=>item.primaryKey).name
    const content = source(item.Key,item.key,primaryKey)
    const generatorPath = config.targetPath + config.name + '/src/main/repositories/'
    console.log('repositories目录', generatorPath,)
     console.log('repositories名称',fileName,)
    createFile(fileName,content,generatorPath)
    })

}
function source(Key, key,primaryKey) {
         const source = {
             template:`
    import { Op } from "sequelize";
import { queryData } from "../utils/query";

class ${Key}Repository {
    ${key}Model
    constructor(data) {
        this.${key}Model = data.${key}Model;
    }

    async create${Key}(data) {
        try {
            const ${key} = await this.${key}Model.create(data);
            return ${key};
        } catch (error) {
            console.error('Error creating ${key}:', error);
            throw error;
        }
    }

    async getAll${Key}s(data) {
        try {
            const queries = queryData(data)
              console.log(222,queries)
            const ${key}s = await this.${key}Model.findAll( queries );
            const total = await this.${key}Model.count(queries);
            return { data: ${key}s.map(e => e.get({ plain: true })) ,total};
        } catch (error) {
            console.error('Error getting all ${key}s:', error);
            throw error;
        }
    }

    async get${Key}ById(id) {
        try {
            const ${key} = await this.${key}Model.findByPk(id);
            return ${key};
        } catch (error) {
            console.error(\`Error getting ${key} with id \${id}:\`, error);
            throw error;
        }
    }

    async update${Key}ById(id, data) {
        try {
            const res = await this.${key}Model.update(
                data,
                { where: {  ${primaryKey}:id }, returning: true }
            );

            return res
        } catch (error) {
            console.error(\`Error updating ${key} with id \${id}:\`, error);
            throw error;
        }
    }

    async delete${Key}ById(id) {
        try {
            const rowsDeleted = await this.${key}Model.destroy({ where: { ${primaryKey}:id } });
            return rowsDeleted > 0;
        } catch (error) {
            console.error(\`Error deleting ${key} with id \${id}:\`, error);
            throw error;
        }
    }
}

export default ${Key}Repository;

`
        }
        return source.template
    }