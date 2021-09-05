import { Context } from 'koa'
declare global {
  interface KoaCtx extends Context {
    success(data?: any, msg?: string, code?: number):void
    error(msg?: string, code?: number, data?: any):void
  }
}
export {}