import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";

export const mysqlConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'tovinping.cn',
  port: 3306,
  username: 'test',
  password: 'tang1233',
  database: 'test',
  synchronize: true,
  entities: [
    'models/*.ts'
  ],
}