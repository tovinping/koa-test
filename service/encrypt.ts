import Router from 'koa-router'
import { responseSuccess } from '../utils'
import { getRsaPublicKey } from '../utils/encrypt'
const router = new Router()

router.get('/publicKey', async ctx => {
  const publicKey = getRsaPublicKey()
  ctx.body = responseSuccess({ body: publicKey })
})

export default router
