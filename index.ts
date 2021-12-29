import Koa from 'koa'
import mongoose from 'mongoose'
import koaStatic from 'koa-static'
import koaBody from 'koa-body'
import appRouter from './router'
import { jwtMiddleware, myCors } from './middleware'
import './db'

const app = new Koa()
app.use(myCors)
app.use(koaStatic('./static'))
app.use(jwtMiddleware(['/user/login', '/user/register', '/user/autoLogin', '/encrypt/publicKey']))
app.use(koaBody())
app.use(appRouter.routes())
console.log('start open db')
const db = mongoose.connection
db.on('error', () => {
  console.error('db open error')
})
db.once('open', () => {
  console.log('db open success')
  app.listen(4000, () => {
    console.log('server started port 4000')
  })
})
