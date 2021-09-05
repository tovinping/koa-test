import { getManager, In } from 'typeorm'
import { GroupInfo } from '../models/GroupInfo'
import { GroupMember } from '../models/GroupMember'
import { Get, Post } from '../router'
import { generateGroupId } from '../utils'

export default class GroupInfoController {
  @Post('/group/add')
  async addGroup(ctx: KoaCtx) {
    try {
      const data = ctx.request.body
      if (!data.groupName || !data?.memberList?.length || !data.owner) {
        throw Error('参数不完整')
      }
      const groupId = generateGroupId()
      const group = new GroupInfo()
      Object.assign(group, { name: data.groupName, groupId, owner: data.owner })
      const members = data.memberList.map(item => {
        return {
          account: item,
          groupId,
        }
      })
      // 创建群的时候需要同时添加群成员-事务操作
      await getManager().transaction(async transactionalEntityManager => {
        await GroupInfo.save(group)
        await GroupMember.save(members)
      })
      ctx.success(group)
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Get('/group/byId')
  async getGroupInfoById(ctx: KoaCtx) {
    try {
      const { groupId } = ctx.query
      const result = await GroupInfo.findOne({ where: { groupId } })
      ctx.success(result)
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/groupList/list')
  async getGroupList(ctx: KoaCtx) {
    try {
      const { groupIds } = ctx.request.body
      if (!groupIds || groupIds.length === 0) {
        ctx.success([])
      } else {
        const groupList = await GroupInfo.find({ where: { groupId: In(groupIds) } })
        ctx.success(groupList)
      }
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/group/notice')
  async updateGroupNotice(ctx: KoaCtx) {
    try {
      const { groupId, notice } = ctx.request.body
      if (!groupId || notice === undefined) {
        throw Error('参数不完整')
      }
      await GroupInfo.update({ groupId }, { notice })
      ctx.success()
    } catch (error) {
      ctx.error(error.toString())
    }
  }
}
