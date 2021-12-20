import Koa from 'koa'
import mongoose from 'mongoose'
import koaStatic from 'koa-static'
import koaBody from 'koa-body'
import koaJwt from 'koa-jwt'
import appRouter from './router'
import { verifyToken } from './middleware'
import './db'

const app = new Koa()
app.use(koaStatic('./static'))
app.use(verifyToken(['/user/login', '/user/register']))
app.use(koaBody())
app.use(appRouter.routes())
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
