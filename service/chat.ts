import Router from 'koa-router'
import { CHAT_TYPE, YES_NO } from '../constant'
import { getLogger } from '../utils/logger'
import { Chat } from '../models'
import { responseError, responseSuccess, validChatType } from '../utils'
const router = new Router()
const logger = getLogger('service_chat')

router.get('/', async ctx => {
  const { account } = ctx.state.token
  const findResult = await Chat.find({ account })
  ctx.body = responseSuccess({ body: findResult })
})
router.post('/', async ctx => {
  const { chatId, type } = ctx.request.body
  logger.info('add chat chatId=', chatId, 'type=', type)
  const { account } = ctx.state.token
  if (!chatId || !validChatType(type)) {
    ctx.body = responseError({ msg: '参数错误' })
    return
  }

  if (type === CHAT_TYPE.P2P) {
    const findResult = await Chat.findOneAndUpdate({ chatId, account }, { $set: { isDel: YES_NO.NO } })
    if (findResult?.chatId) {
      ctx.body = responseSuccess({ msg: '会话已更新为正常' })
      return
    }
    const chat = new Chat({ chatId, type, account })
    const addResult = await chat.save()
    if (addResult.chatId) {
      ctx.body = responseSuccess({ msg: '传话创建成功' })
      return
    }
    ctx.body = responseError({ msg: '创建传话失败' })
  } else {
    ctx.body = responseError({ msg: '暂不支持创建群聊' })
  }
})

export default router
