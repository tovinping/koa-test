import { Next } from 'koa'
export default async function response(ctx: KoaCtx, next: Next) {
  ctx.success = (data = null, msg = 'ok', code = 0) => {
    ctx.body = {
      code,
      data,
      msg
    };
  };
  ctx.error = (msg = '', code = 1, data = null) => {
    ctx.body = {
      code,
      data,
      msg
    };
  };
  await next()
}