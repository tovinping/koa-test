import Router from 'koa-router'
import { getLogger } from '../utils/logger'
import { Msg } from '../models'
import { responseError, responseSuccess } from '../utils'
const router = new Router()
const logger = getLogger('service_msg')

router.get('/history', async ctx => {
  const { chatId, timestamp = 0 } = ctx.query
  const { account } = ctx.state.token
  logger.info('history chatId=', chatId, 'account=', account, 'timestamp=', timestamp)
  if (!chatId) {
    ctx.body = responseError({ msg: '参数错误' })
    return
  }
  const findResult = await Msg.find({ account, chatId, timestamp: { $lt: Number(timestamp) } })
    .limit(20)
    .sort({ timestamp: -1 })
  if (findResult) {
    ctx.body = responseSuccess({ body: findResult })
  } else {
    ctx.body = responseError({ msg: '查询出错' })
  }
})

export default router
