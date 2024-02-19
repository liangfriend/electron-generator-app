import path from "path";
import { Sequelize } from "sequelize";

function sequelize() {
    
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage:  path.join(__dirname, '../data/data.sqlite')
    });
    return sequelize
}
export default sequelize()