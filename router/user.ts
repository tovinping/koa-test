import Router from 'koa-router'
import * as user from '../service/user'
const router = new Router()

router.get('/:account', async ctx => {
  const data = await user.getUser(ctx.params.account)
  ctx.body = { result: 0, data }
})
router.get('/', async ctx => {
  const data = await user.getUsers()
  ctx.body = { result: 0, data }
})
router.post('/', async ctx => {
  const body = ctx.request.body
  console.log('body', body, typeof body)
  const result = await user.addUser(body)
  ctx.body = result
})
router.put('/', async ctx => {
  console.log('put=', ctx)
  ctx.body = { result: 0 }
})
router.del('/:account', async ctx => {
  const data = await user.delUser(ctx.params.account)
  ctx.body = { result: 0, data }
})
router.post('/login', async ctx => {
  const result = await user.login(ctx.request.body)
  ctx.body = result
})
export default router
