import { CHAT_TYPE } from "../constant/chat"

export function isMail(data: string) {
  return /^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(data)
}

export function validChatType(chatType?: string) {
  if (chatType === CHAT_TYPE.P2P || chatType === CHAT_TYPE.GROUP) return true
  return false
}