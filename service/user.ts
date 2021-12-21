import { User } from '../db'
import { responseSuccess, responseError, getUUID, getMD5, getJwtToken } from '../utils'

export function getUser(account: string) {
  return User.findOne({ account })
}
export function getUsers() {
  return User.find()
}
export async function addUser(data: any) {
  if (!data || !data.account || !data.name || !data.password || !data.mail) {
    return responseError({ msg: '数据不完整' })
  }
  const findRes = await User.findOne({ account: data.account })
  if (findRes?.account) {
    return responseError({ msg: '用户已存在' })
  } else {
    const uuid = getUUID()
    const md5Pwd = getMD5(data.password, uuid)
    const user = new User({ ...data, password: md5Pwd, salt: uuid })
    const result = await user.save()
    if (result.account) {
      return responseSuccess({ msg: '添加成功' })
    } else {
      return responseError({ msg: '添加失败' })
    }
  }
}

export function delUser(account: string) {
  console.log('delUser start', account)
  return User.deleteOne({ account })
}
// 未完成
export function updateUser() {
  // 检查token
  return null
}

export async function login(data: any) {
  if (!data || !data.account || !data.password) return responseError({ msg: '数据为空' })
  const findRes = await User.findOne({ account: data.account })
  if (findRes?.password === getMD5(data.password, findRes?.salt)) {
    const token = getJwtToken(findRes)
    return responseSuccess({ msg: '登录成功', data: token })
  } else {
    return responseError({ msg: '登录失败' })
  }
}
