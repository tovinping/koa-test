import mongoose from 'mongoose'
import { CHAT_TYPE, YES_NO } from '../constant'
export interface IChatModel {
  // 创建者帐号
  account: string
  /**群聊为群ID单聊为对方帐号 */
  chatId: string
  /**0单聊1群聊 */
  type: CHAT_TYPE
  /**群聊为群名称，单聊天为对方名称 */
  name: string
  lastMsgId?: string
  isTop: YES_NO
  isDel: YES_NO
}

const schema = new mongoose.Schema<IChatModel>({
  account: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: CHAT_TYPE.P2P,
  },
  name: String,
  lastMsgId: String,
  isTop: { type: Number, default: YES_NO.NO },
  isDel: { type: Number, default: YES_NO.NO },
})
export const Chat = mongoose.model('chat', schema)
