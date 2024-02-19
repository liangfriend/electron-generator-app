import { createFile } from "@/main/utils/common"

export default function generator(config) {
    //
    const content = source(config)
    const fileName = 'migration.ts'
    const generatorPath = config.targetPath + config.name + '/src/main/initialize/'
    createFile(fileName,content,generatorPath)
}
// import StudentModel from "../models/StudentModel";
// import TeacherModel from "../models/TeacherModel";
// import ClassModel from "../models/ClassModel";
// import CourseModel from "../models/CourseModel";
function dynamicImport(data) {

    let result=''
    data.forEach(item => {

        const Key=item.Key
        const str = `import ${Key}Model from "../models/${Key}Model"\n`
        result=result+str
    })
    return result
}
function dynamicSync(data) {

    let result=''
    data.forEach(item => {

        const Key=item.Key
        const str = ` await ${item.Key}Model.sync({ force: true });\n`
        result=result+str
    })
    return result
}
function dynamicDrop(data) {

    let result=''
    data.forEach(item => {

        const Key=item.Key
        const str =` await ${item.Key}Model.drop();\n`
        result=result+str
    })
    return result
}
function source(config) {
    const data=config.data
    const source = {
        template:
        `// import Sequelize
import { DataTypes } from "sequelize";
import sequelize from "./sequelize";
${dynamicImport(data)}
import MigrationModel from "../models/MigrationModel";
import { getLogger } from "../utils/log";

const log=getLogger("test")
// 迁移
const migration = [{
    id:'1.0.0',
    async up() {
    await MigrationModel.sync({ force: true });
    ${dynamicSync(data)}
    },
    async down() {
    await MigrationModel.sync({ force: true });
     ${dynamicDrop(data)}
    }
}];


// 查询迁移表
async function queryMigrate() {
    try {
        const migrations = await MigrationModel.findAll();
        return migrations.map(model => model.get({ plain: true }).id)
    } catch (error) {
        console.error("Error querying migrations:", error);
        return [];
    }
}
// 迁移
export async function migrate() {
    log.info("开始迁移")
    try {
        const idList = await queryMigrate();
        console.log(idList)
        for (let i = 0; i < migration.length; i++) {
            const item = migration[i];
            if (!idList.includes(item.id)) {
                await item.up();
                await MigrationModel.create({ id: item.id });
            }
        }
    } catch (error) {
        console.error("Migration error:", error);
    }
}

`
    }
    return source.template
}