import MD5 from 'md5'
import { v4 as uuidV4 } from 'uuid'
export function getUUID() {
  return uuidV4()
}
export function getMD5(value: string, salt = '') {
  return MD5(value + salt)
}
