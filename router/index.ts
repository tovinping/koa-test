import Router from 'koa-router'
import encryptRouter from '../service/encrypt'
import userRouter from '../service/user'
import chatRouter from '../service/chat'
import tokenRouter from '../service/token'
const router = new Router()
router.use('/user', userRouter.routes())
router.use('/encrypt', encryptRouter.routes())
router.use('/chat', chatRouter.routes())
router.use('/token', tokenRouter.routes())
export default router
