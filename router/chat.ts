import Router from 'koa-router'
import { responseSuccess } from '../utils'
const router = new Router()

router.get('/', async ctx => {
  ctx.body = responseSuccess({ data: [] })
})

export default router
