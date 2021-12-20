import type Koa from 'koa'
import jwt from 'jsonwebtoken'
import config from '../config.json'

export function verifyToken(whiteList: string[]) {
  return (ctx: Koa.Context, next: Koa.Next) => {
    const url = ctx.url
    if (whiteList.includes(url)) {
      return next()
    } else {
      const authorization = ctx.header.authorization
      const tokenStr = authorization?.split(' ')[1]
      if (!tokenStr) {
        ctx.throw(401, 'should login')
      }
      try {
        const data = jwt.verify(tokenStr, config.jwtSecret)
        ctx.state.token = data
      } catch (error) {
        ctx.throw(401, 'token expired')
      }
      return next()
    }
  }
}
