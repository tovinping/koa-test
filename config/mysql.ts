import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
let entities: string[] = []
if (process.env.NODE_ENV === "development") {
  entities = [
    'models/*.ts'
  ]
} else {
  entities = [
    'models/*.js'
  ]
}
export const mysqlConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'tovinping.cn',
  port: 3306,
  username: 'test',
  password: 'tang1233',
  database: 'test',
  synchronize: true,
  entities,
}