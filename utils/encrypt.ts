import MD5 from 'md5'
import NodeRsa from 'node-rsa'
import { v4 as uuidV4 } from 'uuid'
const rsaKey = new NodeRsa({ b: 512 })
rsaKey.setOptions({ encryptionScheme: 'pkcs1' })
export function getUUID() {
  return uuidV4()
}
export function getMD5(data: string, salt = '') {
  return MD5(data + salt)
}

export function encryptRsa(data: string) {
  return rsaKey.encrypt(data)
}
export function decryptRsa(data: string | Buffer) {
  return rsaKey.decrypt(data)
}
export function getRsaPublicKey() {
  return rsaKey.exportKey('public')
}
