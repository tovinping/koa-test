import Koa from 'koa'
import koaBody from 'koa-body'
import appRouter from './router'
import { jwtMiddleware, myCors } from './middleware'
import { mongooseConnect } from './db'
import { redisClient } from './db'
const app = new Koa()
app.use(myCors)
app.use(
  jwtMiddleware([
    '/user/login',
    '/user/register',
    '/user/autoLogin',
    '/user/forgot',
    '/user/forgotCaptcha',
    '/encrypt/publicKey',
    '/token/imgCaptcha',
  ])
)
app.use(koaBody())
app.use(appRouter.routes())
async function start() {
  try {
    console.log('mongoDB连接中...')
    await mongooseConnect()
    console.log('mongoDB连接成功')  
  } catch (error: any) {
    console.error('mongoDB连接失败', error.toString())
  }
  try {
    console.log('redis连接中...')
    await redisClient.connect()
    console.log('redis连接成功')
  } catch (error: any) {
    console.error('redis连接失败', error.toString())
  }
  app.listen(4000, () => {
    console.log('应用服务于4000端口号')
  })
}

start()
