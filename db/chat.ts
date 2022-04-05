import { ACTION_RESULT } from '../constant/db'
import { Chat, IChatModel } from '../models'

export function addChat(data: IChatModel) {
  const chat = new Chat(data)
  return chat.save()
}
export function removeChat() {
  return ACTION_RESULT.OK
}
export function updateChat(data: Partial<IChatModel>) {
  return Chat.updateOne({ account: data.account, chatId: data.chatId }, data)
}
export function getChatOne({ account, chatId }: Pick<IChatModel, 'account' | 'chatId'>) {
  return Chat.findOne({ account, chatId })
}
export async function updateOrCreateChat(data: any) {
  return Chat.updateOne({ account: data.account, chatId: data.chatId }, data, { upsert: true })
}
