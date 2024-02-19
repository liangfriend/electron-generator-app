// import Sequelize
import { DataTypes } from "sequelize";
import sequelize from "./sequelize";
import StudentModel from "../models/StudentModel";
import TeacherModel from "../models/TeacherModel";
import ClassModel from "../models/ClassModel";
import CourseModel from "../models/CourseModel";
import MigrationModel from "../models/MigrationModel";
import { getLogger } from "../utils/log";

const log=getLogger("test")
// 迁移
const migration = [{
    id:'1.0.0',
    async up() {
    await MigrationModel.sync({ force: true });
    await StudentModel.sync({ force: true });
    await TeacherModel.sync({ force: true });
    await CourseModel.sync({ force: true });
    await ClassModel.sync({ force: true });
    },
    async down() {
    await MigrationModel.sync({ force: true });
    await StudentModel.drop();
    await TeacherModel.drop();
    await CourseModel.drop();
    await ClassModel.drop();
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

