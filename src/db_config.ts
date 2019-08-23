import { Sequelize } from "sequelize-typescript";
export const sequelize = new Sequelize({
  dialect: "mysql",
  //operatorsAliases:true,//是否识别字段别名中的下划线
  database: "my_db",
  username: "root",
  password: "123456",
  define: {
    timestamps: false,//是否开启时间戳createAt  deleteAt  updateAt
    paranoid: true,//开启假删除
    underscored: true,//下划线
    charset: "utf8",
    freezeTableName: true
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00',
  modelPaths: [__dirname + './models']
});