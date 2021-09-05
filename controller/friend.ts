import { Context } from 'koa'
import * as md5 from 'md5'
import { Friend } from '../models/Friend'
import { Get, Post } from '../router'

export default class FriendController {
  @Get('/friend/list')
  async getFriends(ctx: Context) {
    try {
      const friendAccounts = await Friend.find({select: ['account'], where: {owner: ctx.owner}})
      ctx.success(friendAccounts)
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/friend/add')
  async addFriend(ctx: Context) {
    try {
      const data = ctx.request.body
      if (!data.account || !data.password) {
        throw Error('参数不完整')
      }
      const friend = new Friend()
      Object.assign(Friend, { ...data, password: md5(data.password) })
      await Friend.save(friend)
      ctx.success()
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Get('/Friend/byId')
  async getFriendById(ctx: Context) {
    try {
      const friend = new Friend()
      Object.assign(Friend, ctx.params)
      const result = await Friend.findOne(Friend)
      ctx.success(result)
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/Friend/remove')
  async removeFriend(ctx: Context) {
    try {
      ctx.success({})
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/Friend/update')
  async update(ctx: Context) {
    try {
      ctx.success({})
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/Friend/login')
  async login(ctx: Context) {
    try {
      const { account, password } = ctx.request.body
      if (!account || !password) {
        ctx.error('参数不完整')
        return
      }
      const result = await Friend.findOne({ where: { account, password: md5(password) } })
      if (result) {
        ctx.success({ timestamp: Date.now() })
      } else {
        ctx.error('登录失败,请检查帐号和密码是否正确')
      }
    } catch (error) {
      ctx.error('登录失败,请检查帐号密码是否正确')
    }
  }
}
