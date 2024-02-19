import { createFile } from "@/main/utils/common"
import { count } from "console"
import path from "path"
import { col } from "sequelize"


export default function generator(config) {
    
    config.data.forEach(item => {
        const fileName=item.key+'Model.ts'
    const content = source(item.Key,item.key,item.column)
    const generatorPath = config.targetPath + config.name + '/src/main/models/'
    console.log('Model目录', generatorPath,)
     console.log('Model名称',fileName,)
    createFile(fileName,content,generatorPath)
    })

}
const typeMap = {
    "TEXT": "DataTypes.STRING",
    "INTEGER":"DataTypes.INTEGER"
}
function dynamicColumn(column) {
    let result = ''
    column.forEach(item => {
        const type = item.type
        const allowNull = item.allowNull
        const name = item.name
        const primaryKey=item.primaryKey
        const str =
        `  ${name}: {
    type: ${typeMap[type]},
    primaryKey:${primaryKey},
    allowNull: ${allowNull}
  },\n`
        result=result+str
    })
    return result
}
function source(Key, key,column) {
         const source = {
             template:
    `import { DataTypes } from "sequelize";
import sequelize from "../initialize/sequelize";

const ${Key}Model = sequelize.define('${Key}', {

  ${dynamicColumn(column)}
}, {
  tableName: '${key}', // 显式指定表名
  freezeTableName: true, // 防止 Sequelize 修改表名
  timestamps: false
//   createdAt: 'ctime',
//   updatedAt: 'utime'
});
export default ${Key}Model
`
        }
        return source.template
    }