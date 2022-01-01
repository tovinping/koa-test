import { User } from '../db'
import {
  responseSuccess,
  responseError,
  getUUID,
  getMD5,
  getJwtToken,
  decryptRsa,
  getRefreshToken,
  decodeJwtToken,
} from '../utils'

export async function getUser(account: string) {
  const result = await User.findOne({ account }, { _id: 0, __v: 0 })
  return responseSuccess({ body: result })
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
  const findRes = await User.findOne({ account: data.account }, { password: 1, account: 1, role: 1, salt: 1 })
  console.log('TANG===', findRes)
  const deCodePwd = decryptRsa(data.password)
  if (!deCodePwd) {
    return responseError({ msg: '密码解析异常' })
  }
  if (findRes?.password === getMD5(deCodePwd, findRes?.salt)) {
    const token = getJwtToken({ account: findRes.account, role: findRes.role })
    const refreshToken = getRefreshToken({ account: findRes.account })
    return responseSuccess({ msg: '登录成功', body: { token, refreshToken } })
  } else {
    return responseError({ msg: '登录失败' })
  }
}

export async function autoLogin(data?: any) {
  if (!data || !data.refreshToken) return responseError({ msg: '登录失败' })
  const tokenObj = decodeJwtToken(data.refreshToken)
  if (tokenObj?.payload?.account) {
    const findRes = await User.findOne({ account: tokenObj.payload.account })
    if (!findRes) return responseError({ msg: '请确认帐号是否有效' })
    const token = getJwtToken({ account: findRes.account, role: findRes.role })
    const refreshToken = getRefreshToken({ account: findRes.account })
    return responseSuccess({ body: { token, refreshToken } })
  }
  return responseError({ msg: '登录已失效' })
}

export async function updateSign(data?: any) {
  const sign = data.request.body.sign || ''
  const account = data.state.token.account
  const result = await User.findOneAndUpdate({ account }, { sign })
  if (result) return responseSuccess({})
  return responseError({})
}
