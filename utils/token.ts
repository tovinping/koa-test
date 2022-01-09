import jwt from 'jsonwebtoken'
import STS from 'qcloud-cos-sts'
import captcha from 'svg-captcha'
import nodemailer from 'nodemailer'
import { getLogger } from '../utils'
import { COS_DEFAULT } from '../constant'
const logger = getLogger('token')
const {
  JWT_SECRET = '',
  COS_SECRET_ID = '',
  COS_SECRET_KEY = '',
  COS_BUCKET = '',
  COS_REGION = '',
  MAIL_HOST = '',
  MAIL_ACCOUNT,
  MAIL_PASSWORD,
} = process.env
interface IGetJwtToken {
  account: string
  role: string
}
function jwtSign(data: object, expiresIn: number | string) {
  return jwt.sign(data, JWT_SECRET, { expiresIn })
}
export function getJwtToken(data: IGetJwtToken) {
  return jwtSign(data, '30m')
}

export function getRefreshToken(data: any) {
  return jwtSign(data, '3d')
}

export function verifyJwtToken(tokenStr: string) {
  return jwt.verify(tokenStr, JWT_SECRET)
}

export function decodeJwtToken(tokenStr: string) {
  return jwt.decode(tokenStr, { complete: true })
}

// 获取腾讯云cos临时密钥
export async function getSts(account: string) {
  const allowPrefix = `${account}/*`
  const [ShortBucketName, AppId] = COS_BUCKET.split('-')
  const policy = {
    version: '2.0',
    statement: [
      {
        action: COS_DEFAULT.ACTIONS,
        effect: 'allow',
        resource: [
          'qcs::cos:' + COS_REGION + ':uid/' + AppId + ':prefix//' + AppId + '/' + ShortBucketName + '/' + allowPrefix,
        ],
      },
    ],
  }
  try {
    const data = await STS.getCredential({
      secretId: COS_SECRET_ID,
      secretKey: COS_SECRET_KEY,
      durationSeconds: COS_DEFAULT.DURATIONS,
      policy: policy,
    })
    return data
  } catch (error) {
    console.error('sts error=', error)
    return null
  }
}
// 登录验证码
export function createCaptcha() {
  return captcha.create({ size: 4, ignoreChars: 'oOiIl1', noise: 1, width: 100, height: 30, fontSize: 30, color: true })
}
async function getMailTransporter() {
  let transporter: nodemailer.Transporter
  const createTransport = () => {
    if (transporter) return transporter
    transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      auth: {
        user: MAIL_ACCOUNT,
        pass: MAIL_PASSWORD,
      },
    })
    return transporter
  }
  return createTransport()
}

// 发送邮件
export async function sendMail(to: `${string}@${string}`, subject: string, html: string) {
  const transporter = await getMailTransporter()
  if (!transporter) {
    return
  }
  try {
    const info = await transporter.sendMail({
      from: 'tovinping@qq.com',
      to,
      subject,
      html,
    })
    logger.info('sendMail ok=', info.response)
    return 0
  } catch (error: any) {
    logger.info('sendMail fail=', error.toString())
    return 1
  }
}
