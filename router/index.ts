import * as Router from 'koa-router'
const router = new Router()
export async function loadRouter(app: any) {
  await import('../controller/User')
  await import('../controller/Conversation')
  await import('../controller/GroupInfo')
  await import('../controller/GroupMember')
  app.use(router.routes())
}
export function Get(url: string) {
  return (target: any, name: string, descriptor: any) => {
    router['get'](url, async (ctx, next) => {
      await descriptor.value(ctx, next)
    })
  }
}
export function Post(url: string) {
  return (target: any, name: string, descriptor: any) => {
    router['post'](url, async (ctx, next) => {
      await descriptor.value(ctx, next)
    })
  }
}
