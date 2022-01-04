import { createClient } from 'redis'
export const redisClient = createClient()

export function saveLoginCaptcha(account: string, captcha: string) {
  return redisClient.setEx(account + 'login', 60, captcha)
}
export function getLoginCaptcha(account: string){
  return redisClient.get(account + 'login')
}
