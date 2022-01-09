export * from './logger'
export * from './response'
export * from './encrypt'
export * from './token'
export * from './validator'

export function isEmpty(val?: any) {
  return !(val
    ? typeof val === 'object'
      ? Array.isArray(val)
        ? !!val.length
        : !!Object.keys(val).length
      : true
    : false)
}
export function random() {
  return Math.random().toString(36).slice(2)
}
interface IExpire<T> {
  value: T
  expire: number
}
// 多进程不适用
export class ExpireMap<T = unknown> {
  private map = new Map<string, IExpire<T>>()
  private expire: number
  private maxSize: number
  constructor(expire = 60000, maxSize = 100) {
    this.expire = expire
    this.maxSize = maxSize
  }
  set(key: string, value: T) {
    if (this.map.size > this.maxSize) {
      return false
    } else {
      this.map.set(key, { value, expire: Date.now() })
      return true
    }
  }
  delete(key: string) {
    this.map.delete(key)
  }
  checkExpire() {
    setTimeout(() => {
      const expireTime = Date.now() - this.expire
      this.map.forEach((item, key) => {
        if (item.expire > expireTime) {
          this.map.delete(key)
        }
      })
      this.checkExpire()
    }, 1000)
  }
}
