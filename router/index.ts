import Router from 'koa-router'
import encryptRouter from './encrypt'
import userRouter from './user'
import chat from './chat'
const router = new Router()
router.use('/user', userRouter.routes())
router.use('/encrypt', encryptRouter.routes())
router.use('/chat', chat.routes())
export default router
