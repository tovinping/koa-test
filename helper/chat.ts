import { YES_NO } from '../constant'
import { IChatModel } from '../models'

type IGetChatTemp = Pick<IChatModel, 'account' | 'chatId' | 'type'>
export function getChatTemp(data: IGetChatTemp): IChatModel {
  return {
    name: '',
    isTop: YES_NO.NO,
    isDel: YES_NO.NO,
    ...data,
  }
}
