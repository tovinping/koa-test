import { createClient } from 'redis'
export const redisClient = createClient()

export function saveLoginCaptcha(key: string, captcha: string) {
  return redisClient.setEx(key, 60, captcha)
}
export function getLoginCaptcha(key: string){
  return redisClient.get(key)
}
export function removeLoginCaptcha(key: string) {
  return redisClient.del(key)
}
