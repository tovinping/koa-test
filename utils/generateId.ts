import * as uuid from 'uuid'
export function generateGroupId() {
  return uuid.v4()
}
export function generateMsgId() {
  return uuid.v4()
}