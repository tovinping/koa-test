import 'reflect-metadata'
import * as Koa from 'koa'
import { createConnection } from 'typeorm'

import * as http from 'http'
import { loadSocket } from './socket'
import { loadRouter } from './router'
import { loadMiddleware } from './middleware'
import { mysqlConfig } from './config'
import './typings'
createConnection(mysqlConfig)
  .then(async () => {
    const app = new Koa()
    const server = http.createServer(app.callback())
    // 中间件
    loadMiddleware(app)
    // 路由
    loadRouter(app)
    // socket
    loadSocket(server)
    // 监听端口
    server.listen(4000, () => {
      console.log('listening on *:4000')
    })
  })
  .catch((err) => {
    console.error(err, mysqlConfig)
  })
