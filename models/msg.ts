import mongoose from 'mongoose'
import { CHAT_TYPE, YES_NO } from '../constant'
import { MSG_TYPE } from '../constant'
export interface IMsgModel {
  msgId: string
  // 创建者帐号
  account: string
  /**群聊为群ID单聊为对方帐号 */
  chatId: string
  /**0单聊1群聊 */
  chatType: CHAT_TYPE
  /**发送者名称**/
  name: string
  content: string
  /**消息类型 */
  type: MSG_TYPE
  timestamp: number
  isDel?: YES_NO
}

const schema = new mongoose.Schema<IMsgModel>({
  msgId: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  name: String,
  content: String,
  chatId: {
    type: String,
    required: true,
  },
  chatType: {
    type: String,
    required: true,
    default: CHAT_TYPE.P2P,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  isDel: { type: Number, default: YES_NO.NO },
})
export const Msg = mongoose.model('msg', schema)
