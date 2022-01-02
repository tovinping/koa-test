import Router from 'koa-router'
import { getSts } from '../service'
import { responseError, responseSuccess } from '../utils'
const router = new Router()

router.get('/sts', async ctx => {
  const token = await getSts()
  console.log('token==', token)
  if (!token) {
    ctx.body = responseError({})
  }
  ctx.body = responseSuccess({ body: token })
})

export default router
