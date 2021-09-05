import {IBaseMsg} from './message'
type ITopState = '0' | '1'
export type IConversationType = '0' | '1'
export interface IBaseConversation {
  conversationId: string
  /**0单聊1群聊 */
  type: IConversationType
  lastMsg?: IBaseMsg
  /**0普通1置顶 */
  topState: ITopState
}