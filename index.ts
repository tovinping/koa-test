import Koa from 'koa'
import koaBody from 'koa-body'
import './constant'
import appRouter from './router'
import { jwtMiddleware, myCors, duration } from './middleware'
import { mongooseConnect } from './db'
import { redisClient } from './db'
import { getLogger } from './utils'
import { initSocket } from './service/socket'
const { API_PORT } = process.env;
const logger = getLogger()
const app = new Koa()
app.use(duration)
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
logger.info('应用启动中')
logger.debug('Some debug messages')
async function start() {
  initSocket()
  try {
    logger.info('mongoDB连接中...')
    await mongooseConnect()
    logger.info('mongoDB连接成功')
  } catch (error: any) {
    logger.error('mongoDB连接失败', error.toString())
  }
  try {
    logger.info('redis连接中...')
    await redisClient.connect()
    logger.info('redis连接成功')
  } catch (error: any) {
    console.error('redis连接失败', error.toString())
  }
  app.listen(API_PORT, () => {
    logger.info(`应用启动成功端口: ${API_PORT}`)
  })
}

start()
