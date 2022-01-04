import jwt from 'jsonwebtoken'
import STS from 'qcloud-cos-sts'

import config from '../config.json'

interface IGetJwtToken {
  account: string
  role: string
}
function sign(data: object, expiresIn: number | string) {
  return jwt.sign(data, config.jwtSecret, { expiresIn })
}
export function getJwtToken(data: IGetJwtToken) {
  return sign(data, '30m')
}

export function getRefreshToken(data: any) {
  return sign(data, '3d')
}

export function verifyJwtToken(tokenStr: string) {
  return jwt.verify(tokenStr, config.jwtSecret)
}

export function decodeJwtToken(tokenStr: string) {
  return jwt.decode(tokenStr, { complete: true })
}

// 获取腾讯云cos临时密钥
export async function getSts(account: string) {
  const cosConfig = { ...config.cos, allowPrefix: `${account}/*` }
  const [ShortBucketName, AppId] = cosConfig.bucket.split('-')
  const policy = {
    version: '2.0',
    statement: [
      {
        action: cosConfig.allowActions,
        effect: 'allow',
        resource: [
          'qcs::cos:' +
            cosConfig.region +
            ':uid/' +
            AppId +
            ':prefix//' +
            AppId +
            '/' +
            ShortBucketName +
            '/' +
            cosConfig.allowPrefix,
        ],
      },
    ],
  }
  const data = await STS.getCredential({
    secretId: cosConfig.secretId,
    secretKey: cosConfig.secretKey,
    durationSeconds: cosConfig.durationSeconds,
    policy: policy,
  })
  return data
}
