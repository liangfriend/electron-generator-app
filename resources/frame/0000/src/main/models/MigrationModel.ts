import { DataTypes } from "sequelize";
import sequelize from "../initialize/sequelize";

const MigrationModel = sequelize.define('Migration', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true
  }
}, {
  tableName: 'migration', // 显式指定表名
  freezeTableName: true, // 防止 Sequelize 修改表名
  timestamps: false
//   createdAt: 'ctime',
//   updatedAt: 'utime'
});
export default MigrationModel