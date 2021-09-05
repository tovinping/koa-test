import { Context } from 'koa'
import * as md5 from 'md5'
import { User } from '../models/User'
import { Get, Post } from '../router'

export default class UserController {
  @Get('/user/list')
  async getUsers(ctx: Context) {
    try {
      const users = await User.find({select: ['account', 'avatar', 'name', 'email', 'pinyin']})
      ctx.success(users)
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/user/add')
  async addUser(ctx: Context) {
    try {
      const data = ctx.request.body
      if (!data.account || !data.password) {
        throw Error('参数不完整')
      }
      const user = new User()
      Object.assign(user, { ...data, password: md5(data.password) })
      await User.save(user)
      ctx.success()
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Get('/user/byId')
  async getUserById(ctx: Context) {
    try {
      const user = new User()
      Object.assign(user, ctx.params)
      const result = await User.findOne(user)
      ctx.success(result)
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/user/remove')
  async removeUser(ctx: Context) {
    try {
      ctx.success({})
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/user/update')
  async update(ctx: Context) {
    try {
      ctx.success({})
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/user/login')
  async login(ctx: Context) {
    try {
      const { account, password } = ctx.request.body
      if (!account || !password) {
        ctx.error('参数不完整')
        return
      }
      const result = await User.findOne({ where: { account, password: md5(password) } })
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
