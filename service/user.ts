import Router from 'koa-router'
import { getForgotCaptcha, getLoginCaptcha, removeLoginCaptcha, saveForgotCaptcha, User } from '../models'
import {
  responseSuccess,
  responseError,
  getUUID,
  getMD5,
  getJwtToken,
  decryptRsa,
  getRefreshToken,
  decodeJwtToken,
  isMail,
  random,
  sendMail,
  getLogger,
} from '../utils'
const router = new Router()
const logger = getLogger('user')
router.get('/list', async ctx => {
  const accountStr = ctx.request.query.accounts
  if (!accountStr) {
    ctx.body = responseError()
    return
  }
  try {
    const accounts = (accountStr as string).split(',')
    logger.info('/list', accountStr)
    const findResult = await User.find({ account: { $in: accounts } }, { _id: 0, role: 0, __v: 0 })
    ctx.body = responseSuccess({ body: findResult })
  } catch (error) {
    ctx.body = responseError()
  }
})
router.get('/:account', async ctx => {
  const account = ctx.params.account
  const result = await User.findOne({ account }, { _id: 0, __v: 0 })
  ctx.body = responseSuccess({ body: result })
})

router.post('/register', async ctx => {
  const data = ctx.request.body
  if (!data || !data.account || !data.name || !data.password || !data.mail) {
    ctx.body = responseError({ msg: '数据不完整' })
    return
  }
  if (!isMail(data.mail)) {
    ctx.body = responseError({ msg: '邮箱格式不正确' })
    return
  }
  const findRes = await User.findOne({ account: data.account })
  if (findRes?.account) {
    ctx.body = responseError({ msg: '用户已存在' })
    return
  } else {
    const deCodePwd = decryptRsa(data.password)
    if (!deCodePwd) {
      ctx.body = responseError({ msg: '密码解析失败' })
      return
    }
    const salt = getUUID()
    const md5Pwd = getMD5(deCodePwd, salt)
    const user = new User({ ...data, password: md5Pwd, salt })
    const result = await user.save()
    if (result.account) {
      ctx.body = responseSuccess({ msg: '注册成功' })
      return
    } else {
      ctx.body = responseError({ msg: '注册失败' })
      return
    }
  }
})

router.post('/login', async ctx => {
  const { account, password, captchaId, captchaText } = ctx.request.body
  logger.info('login=', 'acc=', account, 'pwd=', password, 'cap=', captchaId, 'capt=', captchaText)
  if (!account || !password || !captchaId || !captchaText) {
    ctx.body = responseError({ msg: '缺少必要参数' })
    return
  }
  const redisCaptcha = await getLoginCaptcha(captchaId)
  if (redisCaptcha && redisCaptcha.toLocaleLowerCase() !== captchaText) {
    ctx.body = responseError({ msg: '验证码错误' })
    return
  }
  const findRes = await User.findOne({ account: account }, { password: 1, account: 1, role: 1, salt: 1 })
  const deCodePwd = decryptRsa(password)
  if (!deCodePwd) {
    ctx.body = responseError({ msg: '密码解析异常' })
    return
  }
  if (findRes?.password === getMD5(deCodePwd, findRes?.salt)) {
    const token = getJwtToken({ account: findRes.account, role: findRes.role })
    const refreshToken = getRefreshToken({ account: findRes.account })
    ctx.body = responseSuccess({ msg: '登录成功', body: { token, refreshToken } })
    removeLoginCaptcha(captchaId)
    return
  } else {
    ctx.body = responseError({ msg: '帐号或密码错误' })
    return
  }
})

router.post('/autoLogin', async ctx => {
  const data = ctx.request.body
  if (!data || !data.account || !data.refreshToken) {
    ctx.body = responseError({ msg: '登录失败' })
    return
  }
  const tokenObj = decodeJwtToken(data.refreshToken)
  if (tokenObj?.payload.account !== data.account) {
    ctx.body = responseError({ msg: 'token不匹配' })
    return
  }
  if (tokenObj?.payload?.account) {
    const findRes = await User.findOne({ account: tokenObj.payload.account })
    if (!findRes) {
      ctx.body = responseError({ msg: '请确认帐号是否有效' })
      return
    }
    const token = getJwtToken({ account: findRes.account, role: findRes.role })
    const refreshToken = getRefreshToken({ account: findRes.account })
    ctx.body = responseSuccess({ body: { token, refreshToken } })
    return
  }
  ctx.body = responseError({ msg: '登录已失效' })
})

router.put('/sign', async ctx => {
  const sign = ctx.request.body.sign || ''
  const account = ctx.state.token.account
  const result = await User.findOneAndUpdate({ account }, { sign })
  if (result) {
    ctx.body = responseSuccess({})
    return
  }
  ctx.body = responseError({})
})

router.put('/avatar', async ctx => {
  const avatar = ctx.request.body.avatarUrl
  const account = ctx.state.token.account
  const result = await User.findOneAndUpdate({ account }, { avatar })
  if (result) {
    ctx.body = responseSuccess({})
  } else {
    ctx.body = responseError({})
  }
})

router.put('/password', async ctx => {
  const account = ctx.body.account
  const tokenAccount = ctx.state.token.account
  ctx.body = { msg: 'ok', data: { account, tokenAccount } }
})
router.put('/forgot', async ctx => {
  const { account, mail, password, captcha } = ctx.request.body
  if (!account || !isMail(mail) || !password || !captcha) {
    ctx.body = responseError({ msg: '参数格式不正确' })
    return
  }
  // 验码-未完成-验证帐号和密码是一起的
  const redisResult = await getForgotCaptcha(account)
  if (redisResult !== captcha) {
    ctx.body = responseError({ msg: '验证码不匹配或已失效' })
    return
  }
  const findRes = await User.findOne({ account }, { salt: 1, mail: 1 })
  if (findRes?.mail !== mail) {
    ctx.body = responseError({ msg: '哦豁,失败啦' })
    return
  }
  const deCodePwd = decryptRsa(password)
  if (!deCodePwd) {
    ctx.body = responseError({ msg: '密码解析失败' })
    return
  }
  const md5Pwd = getMD5(deCodePwd, findRes?.salt)
  const updateRes = await User.findOneAndUpdate({ account }, { password: md5Pwd })
  if (updateRes) {
    ctx.body = responseSuccess({})
    return
  }
  ctx.body = responseError({})
})
router.put('/forgotCaptcha', async ctx => {
  const { account, mail } = ctx.request.body
  if (!account || !isMail(mail)) {
    ctx.body = responseError({ msg: '参数格式不正确' })
    return
  }
  const redisResult = await getForgotCaptcha(account)
  if (redisResult) {
    ctx.body = responseSuccess({ msg: '验证码已发送' })
    return
  }
  const matchResult = await User.findOne({ account }, { mail: 1 })
  if (matchResult?.mail !== mail) {
    ctx.body = responseError({ msg: '帐号和邮箱不匹配' })
    return
  }
  const captcha = random()
  saveForgotCaptcha(account, captcha)
  const html = `验证码<b>${captcha}</b>(3分钟有效)`
  const result = await sendMail(mail, '忘记密码', html)
  if (result === 0) {
    ctx.body = responseSuccess({ msg: '验证码发送成功' })
  } else {
    ctx.body = responseError({ msg: '验证码发送失败' })
  }
})
export default router
