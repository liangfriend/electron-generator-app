import { DataTypes } from "sequelize";
import sequelize from "../initialize/sequelize";

const TeacherModel = sequelize.define('Teacher', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'teacher', // 显式指定表名
  freezeTableName: true, // 防止 Sequelize 修改表名
  timestamps: false
//   createdAt: 'ctime',
//   updatedAt: 'utime'
});
export default TeacherModel