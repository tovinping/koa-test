import { Context } from 'koa'
export * from './conversation'
export * from './message'
export * from './user'
export * from './group'
export * from './member'
declare global {
  interface KoaCtx extends Context {
    success(data?: any, msg?: string, code?: number):void
    error(msg?: string, code?: number, data?: any):void
  }
}
export {}