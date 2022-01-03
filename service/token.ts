import Router from 'koa-router'

import { ERROR_CODE } from '../constant'
import { decodeJwtToken, getSts, responseError, responseSuccess, verifyJwtToken } from '../utils'

const router = new Router()

router.put('/refreshToken', async ctx => {
  const tokenStr = ctx.request.body.tokenStr
  if (!tokenStr) {
    ctx.body = responseError({ code: ERROR_CODE.TOKEN_EMPTY, msg: 'token is empty' })
    return
  }
  const data = decodeJwtToken(tokenStr)
  const payload = data?.payload
  if (!payload) {
    ctx.body = responseError({
      code: ERROR_CODE.TOKEN_ERROR,
      msg: 'token is error',
    })
    return
  }

  try {
    const data = verifyJwtToken(tokenStr)
    ctx.body = responseSuccess({ body: data })
  } catch (error) {
    ctx.body = responseError({
      code: ERROR_CODE.TOKEN_EXPIRE,
      msg: 'token is expired',
    })
  }
})

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
