import Router from 'koa-router'
import userRouter from './user'
import encryptRouter from './encrypt'
const router = new Router()
router.use('/user', userRouter.routes())
router.use('/encrypt', encryptRouter.routes())
export default router
