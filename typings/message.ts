import {IConversationType} from './conversation'
export enum IMsgType {
  TEXT = 0,
  IMAGE = 1,
  VIDEO = 2,
  AUDIO = 3,
  FILE = 4
}
export enum IMsgState {
  NORMAL = 0,
  WITHDRAW = 1,
  DELETE = 2
}
export interface IBaseMsg {
  /**服务器生产的消息ID */
  id: string
  chatType: IConversationType
  /**会话ID-单人:个人帐号;群聊:群Id*/
  groupId?: string
  type: IMsgType
  timestamp: number
  state: IMsgState
  /**发送者帐号 */
  senderId: string
  /**接收者帐号 */
  receiveId?: string
  /**主动发送时产生的消息ID */
  clientId?: string
  /**消息内容*/
  content: string;
}
