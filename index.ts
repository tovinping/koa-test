import Koa from 'koa'
import mongoose from 'mongoose'
import koaBody from 'koa-body'
import appRouter from './router'
import { jwtMiddleware, myCors } from './middleware'
import './db'

const app = new Koa()
app.use(myCors)
app.use(jwtMiddleware(['/user/login', '/user/register', '/user/autoLogin', '/encrypt/publicKey']))
app.use(koaBody())
app.use(appRouter.routes())
console.log('数据库连接中...')
const db = mongoose.connection
db.on('error', () => {
  console.error('db open error')
})
db.once('open', () => {
  console.log('数据库连接成功')
  app.listen(4000, () => {
    console.log('应用服务于4000端口号')
  })
})
