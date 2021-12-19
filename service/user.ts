import { User } from '../db'
import { responseSuccess, responseError } from '../utils'

export function getUser(account: string) {
  return User.findOne({ account })
}
export function getUsers() {
  return User.find()
}
export async function addUser(data: any) {
  if (!data) return responseError({ msg: '不要上传空数据' })
  if (!data.account || !data.name || !data.password || !data.mail) {
    return { result: 1, msg: '数据不完整' }
  }
  const findRes = await User.findOne({ account: data.account })
  if (findRes?.account) {
    return responseError({ msg: '用户已存在' })
  } else {
    return responseSuccess({ msg: '添加成功' })
  }
}

export function delUser(account: string) {
  console.log('delUser start', account)
  return User.deleteOne({ account })
}

export function updateUser() {
  return null
}
