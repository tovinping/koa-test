import { Context } from 'koa'
import { In } from 'typeorm'
import { GroupMember } from '../models/GroupMember'
import { Get, Post } from '../router'

export default class UserController {
  @Post('/groupMember/add')
  async addGroupMember(ctx: Context) {
    try {
      const { accounts, groupId } = ctx.request.body
      if (!groupId || !accounts || !accounts.length) {
        throw Error('参数不完整')
      }
      const member = new GroupMember()
      const members = accounts.map(account => {
        return { ...member, account, groupId }
      })
      await GroupMember.save(members)
      ctx.success()
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Get('/groupMember/byGroupId')
  async getGroupMembers(ctx: Context) {
    try {
      if (!ctx.query.groupId) {
        throw Error('参数不完整')
      }
      const user = new GroupMember()
      Object.assign(user, { groupId: ctx.query.groupId })
      const result = await GroupMember.find({ where: { groupId: ctx.query.groupId } })
      ctx.success(result)
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/groupMember/remove')
  async removeGroupMember(ctx: Context) {
    try {
      const { accounts, groupId } = ctx.request.body
      if (!groupId || !accounts || !accounts.length) {
        throw Error('参数不完整')
      }
      await GroupMember.delete({account: In(accounts)})
      ctx.success()
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/groupMember/update')
  async updateGroupMember(ctx: Context) {
    try {
      ctx.success({})
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/groupMember/admin')
  async addAdmin(ctx: Context) {
    try {
      console.log('TANG==', ctx.request.body)
      const { account, type, groupId } = ctx.request.body
      if (account && type && groupId) {
        const memberInfo = await GroupMember.findOne({ where: { account, groupId } })
        if (!memberInfo) {
          ctx.error('更新失败')
          return
        }
        memberInfo.type = type
        console.log('TANG=', memberInfo, type)
        const result = await GroupMember.save(memberInfo)
        ctx.success(result)
      } else {
        ctx.error('参数错误')
      }
    } catch (error) {
      ctx.error(error.toString())
    }
  }
}
