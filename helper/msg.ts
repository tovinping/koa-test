export function checkClientMsg(data: any) {
  if (!data.account) return
  if (!data.content) return
  if (!data.type) return
  if (!data.chatId) return
  if (!data.chatType) return
  return true
}
