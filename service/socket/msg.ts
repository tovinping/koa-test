import { ACTION_RESULT } from '../../constant/db'
import { addMsg, updateChat } from '../../db'
import { IMsgModel } from '../../models'
import { getLogger, getUUID } from '../../utils'
import io from './index'
const logger = getLogger('socket_msg')
interface ISendResult {
  msg: any
  isOk: boolean
  tips: string
}

export async function p2pChat(msg: IMsgModel): Promise<ISendResult> {
  logger.info('p2pChat account=', msg.account, 'type=', msg.type, 'chatId=', msg.chatId)
  msg.msgId = getUUID()
  const dbRes = await addMsg(msg)
  updateChat({ account: msg.account, chatId: msg.chatId, lastMsgId: msg.msgId })
  if (dbRes === ACTION_RESULT.ERROR) {
    return { isOk: false, tips: 'save db error', msg }
  }
  const result = await io.of('/').to(msg.chatId).emit('message', msg)
  return { isOk: !!result, tips: '', msg }
}
