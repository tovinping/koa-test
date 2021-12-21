import type Koa from 'koa'
import { ERROR_CODE } from '../constant'
import { responseError, verifyJwtToken } from '../utils'

export function jwtMiddleware(whiteList: string[]) {
  return (ctx: Koa.Context, next: Koa.Next) => {
    const url = ctx.url
    if (whiteList.includes(url)) {
      return next()
    } else {
      const authorization = ctx.header.authorization
      const tokenStr = authorization?.split(' ')[1]
      if (!tokenStr) {
        ctx.body = responseError({
          code: ERROR_CODE.TOKEN_EMPTY,
          msg: 'token is empty',
        })
        return
      }
      try {
        const data = verifyJwtToken(tokenStr)
        ctx.state.token = data
        return next()
      } catch (error) {
        ctx.body = responseError({
          code: ERROR_CODE.TOKEN_EXPIRE,
          msg: 'token is expired',
        })
        return
      }
    }
  }
}
