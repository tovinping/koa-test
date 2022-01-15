import { getLogger } from 'log4js'
import { Server } from 'socket.io'
import { CHAT_TYPE } from '../../constant'
import { decodeJwtToken, isDev } from '../../utils'
const logger = getLogger('socket')
const origin = isDev() ? 'http://localhost:3000' : 'https://im.tovinping.cn'
const io = new Server({
  cors: {
    origin,
  },
})
// 登录验证
io.use((socket, next) => {
  const { token, account } = socket.handshake.auth
  if (!token || !account) {
    logger.error('auth token=', token, 'account=', account)
    next(new Error('必需有有登录凭证'))
    return
  }
  const decodeToken = decodeJwtToken(token)
  const jwtAcc = decodeToken?.payload.account
  if (jwtAcc !== account) {
    logger.error('auth jwtAcc=', jwtAcc, 'account=', account)
    next(new Error('认证失败'))
  } else {
    next()
  }
})
// 校验是否可以发消息--权限不足-对方帐号已失效
function checkSend(chatId: string, chatType: string) {
  return chatId || chatType
}
// 单聊
async function p2pChat(msg: {chatId: string, senderId: string, chatType: string}) {
  const checkResult = checkSend(msg.chatId, msg.chatType)
  if (checkResult === '') {
    logger.error('p2pChat check=', msg.chatId, 'senderId=', msg.senderId)
    return {isOk: false, msg: checkResult}
  }
  const result = await io.of('/').to(msg.chatId).emit('message', msg)
  if (!result) {
    logger.error('p2pChat=', msg.chatId, 'senderId=', msg.senderId)
  }
  return {isOk: !!result, msg: ''}
}

io.on('connection', socket => {
  const account = socket.handshake.auth.account
  logger.info('connected=', socket.id, account)
  socket.join(account)
  socket.on('message', async (msg, cb) => {
    if (msg.chatType === CHAT_TYPE.P2P) {
      const result = await p2pChat(msg)
      cb(result)
    }
    cb(new Error('不支持的消息'))
  })
})
export function initSocket() {
  console.log('socket start')
  io.listen(4001)
}
