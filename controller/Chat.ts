import { Chat } from '../models/Chat'
import { Get, Post } from '../router'

export default class UserController {
  @Get('/chat/list')
  async getChats(ctx: KoaCtx) {
    try {
      if (!ctx.query.account) {
        ctx.error('我说没有数据你信吗?')
      }
      const chats = await Chat.find({where: {owner: ctx.query.account}})
      ctx.success(chats)
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Get('/chat/id')
  async getChatInfo(ctx: KoaCtx) {
    try {
      const {chatId, owner} = ctx.query
      if (!chatId) {
        ctx.error('参数错误')
      }
      const chat = await Chat.findOne({where: {owner, chatId}})
      ctx.success(chat)
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/chat/add')
  async addChat(ctx: KoaCtx) {
    try {
      const {chatId, owner, type} = ctx.request.body
      if (!chatId || !owner || !type) {
        throw Error('参数不完整')
      }
      const chat = await Chat.findOne({where: {chatId, owner, type}})
      if (chat) {
        ctx.success(chat)
      } else {
        const chat = new Chat()
        Object.assign(chat, { chatId, owner, type})
        const result = await Chat.save(chat)
        ctx.success(result)
      }
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/chat/remove')
  async removeChat(ctx: KoaCtx) {
    try {
      ctx.success({})
    } catch (error) {
      ctx.error(error.toString())
    }
  }
  @Post('/chat/update')
  async updateChat(ctx: KoaCtx) {
    try {
      ctx.success({})
    } catch (error) {
      ctx.error(error.toString())
    }
  }
}
