import { Server, Socket } from 'socket.io'
const socketMap = new Map()
export function loadSocket(server: any) {
  const io = new Server(server, { cors: { origin: '*' } })
  io.use((socket, next) => {
    let auth = socket.handshake.auth as any
    if (!auth.token) {
      next(new Error('token error'))
    } else {
      socketMap.set(auth.token, socket)
      next()
    }
  })

  io.on('connection', (socket: Socket) => {
    socket.on('message', (msg: any, cb) => {
      const socketItem = socketMap.get(msg.receiveId)
      if (socketItem) { // 在线消息
        socketItem.send(msg)
      } else { // 离线消息
        console.log('离线消息', msg.receiveId)
      }
      cb({ msg: 'ok' })
    })
    socket.on('disconnect', () => {
      console.log('user disconnected')
      socketMap.delete('aaa')
    })
  })
}
