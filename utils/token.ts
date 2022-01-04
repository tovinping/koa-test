import jwt from 'jsonwebtoken'
import STS from 'qcloud-cos-sts'
import { COS_DEFAULT } from '../constant'
const { JWT_SECRET = '', COS_SECRET_ID = '', COS_SECRET_KEY = '', COS_BUCKET = '', COS_REGION = '' } = process.env
interface IGetJwtToken {
  account: string
  role: string
}
function sign(data: object, expiresIn: number | string) {
  return jwt.sign(data, JWT_SECRET, { expiresIn })
}
export function getJwtToken(data: IGetJwtToken) {
  return sign(data, '30m')
}

export function getRefreshToken(data: any) {
  return sign(data, '3d')
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
          'qcs::cos:' +
            COS_REGION +
            ':uid/' +
            AppId +
            ':prefix//' +
            AppId +
            '/' +
            ShortBucketName +
            '/' +
            allowPrefix,
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
