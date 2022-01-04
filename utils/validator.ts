export function isMail(data: string) {
  return /^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(data)
}
