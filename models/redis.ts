import { createClient } from 'redis'
export const redisClient = createClient({ url: 'redis://tovinping.cn' })
// 登录验证码
export function saveLoginCaptcha(key: string, captcha: string) {
  return redisClient.setEx(key, 60, captcha)
}
export function getLoginCaptcha(key: string) {
  return redisClient.get(key)
}
export function removeLoginCaptcha(key: string) {
  return redisClient.del(key)
}
// 修改密码验证码
export function saveForgotCaptcha(key: string, captcha: string) {
  return redisClient.setEx(key, 180, captcha)
}
export function getForgotCaptcha(key: string) {
  return redisClient.get(key)
}
export function removeForgotCaptcha(key: string) {
  return redisClient.del(key)
}
