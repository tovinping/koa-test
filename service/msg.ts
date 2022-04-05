import Router from 'koa-router'
import { getLogger } from '../utils/logger'
import { Msg } from '../models'
import { responseError, responseSuccess } from '../utils'
import { CHAT_TYPE } from '../constant'
const router = new Router()
const logger = getLogger('service_msg')

router.get('/history', async ctx => {
  const { chatId, chatType, timestamp = 0 } = ctx.query
  const { account } = ctx.state.token
  logger.info('history chatId=', chatId, 'account=', account, 'timestamp=', timestamp)
  if (!chatId || !chatType) {
    ctx.body = responseError({ msg: '参数错误' })
    return
  }
  if (chatType === CHAT_TYPE.P2P) {
    const findResult = await Msg.find({ timestamp: { $lt: Number(timestamp) } })
      .or([
        { chatId: account, account: chatId },
        { account, chatId },
      ])
      .limit(20)
      .sort({ timestamp: -1 })
    ctx.body = responseSuccess({ body: findResult })
  } else {
    const findResult = await Msg.find({ chatId, timestamp: { $lt: Number(timestamp) } })
      .limit(20)
      .sort({ timestamp: -1 })
    ctx.body = responseSuccess({ body: findResult })
  }
})

export default router
