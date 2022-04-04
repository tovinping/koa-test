import Router from 'koa-router'
import { CHAT_TYPE, YES_NO } from '../constant'
import { Chat } from '../models'
import { responseError, responseSuccess, validChatType } from '../utils'
const router = new Router()

router.get('/', async ctx => {
  const { account } = ctx.state.token
  const findResult = await Chat.find({ account })
  ctx.body = responseSuccess({ body: findResult })
})
router.post('/', async ctx => {
  const { chatId, chatType, isTop = YES_NO.NO } = ctx.request.body
  const { account } = ctx.state.token
  if (!chatId || !validChatType(chatType)) {
    ctx.body = responseError({ msg: '参数错误' })
    return
  }

  if (chatType === CHAT_TYPE.P2P) {
    const findResult = await Chat.findOneAndUpdate({ chatId }, { $set: { isDel: YES_NO.NO } })
    if (findResult?.chatId) {
      ctx.body = responseSuccess({ msg: '会话已更新为正常' })
      return
    }
    const chat = new Chat({ chatId, chatType, isTop, account })
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
