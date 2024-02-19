import { DataTypes } from "sequelize";
import sequelize from "../initialize/sequelize";

const CourseModel = sequelize.define('Course', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'course', // 显式指定表名
  freezeTableName: true, // 防止 Sequelize 修改表名
  timestamps: false
//   createdAt: 'ctime',
//   updatedAt: 'utime'
});
export default CourseModel