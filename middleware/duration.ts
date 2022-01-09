import type Koa from 'koa'
import { getLogger } from '../utils'
const logger = getLogger()
export async function duration(ctx: Koa.Context, next: Koa.Next) {
  const method = ctx.method
  const url = ctx.originalUrl
  const timeStart = Date.now()
  try {
    await next()
    const duration = Date.now() - timeStart
    logger.info(`${method} ${url} ${duration}ms`)
  } catch (error) {
    const duration = Date.now() - timeStart
    logger.error(`${method} ${url} ${duration}ms`)
  }
  return
}
