import Router from 'koa-router'
import { getSts } from '../service'
import { responseError, responseSuccess } from '../utils'
const router = new Router()

router.get('/sts/:account', async ctx => {
  const account = ctx.params.account
  const tokenAccount = ctx.state?.token?.account
  if (!account || account !== tokenAccount) {
    ctx.body = responseError({ msg: '帐号不合法' })
    return
  }
  const token = await getSts(account)
  if (!token) {
    ctx.body = responseError({})
  }
  ctx.body = responseSuccess({ body: token })
})

export default router
