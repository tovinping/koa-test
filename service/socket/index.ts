import { Server } from 'socket.io'
import { isDev } from '../../utils'

const origin = isDev() ? 'http://localhost:3000' : 'https://im.tovinping.cn'
const io = new Server({
  cors: {
    origin,
  },
})

io.on('connection', socket => {
  console.log('connection==', socket.id)
})
export function initSocket() {
  console.log('socket start')
  io.listen(4001)
}
