import { DataTypes } from "sequelize";
import sequelize from "../initialize/sequelize";

const ClassModel = sequelize.define('Class', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'class', // 显式指定表名
  freezeTableName: true, // 防止 Sequelize 修改表名
  timestamps: false
//   createdAt: 'ctime',
//   updatedAt: 'utime'
});
export default ClassModel