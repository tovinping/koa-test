import STS from 'qcloud-cos-sts'
import { ERROR_CODE } from '../constant'
import { decodeJwtToken, responseError, responseSuccess, verifyJwtToken } from '../utils'
import config from '../config.json'

export function refreshToken(tokenStr: string) {
  if (!tokenStr) return responseError({ code: ERROR_CODE.TOKEN_EMPTY, msg: 'token is empty' })
  const data = decodeJwtToken(tokenStr)
  const payload = data?.payload
  if (!payload) {
    return responseError({
      code: ERROR_CODE.TOKEN_ERROR,
      msg: 'token is error',
    })
  }

  try {
    const data = verifyJwtToken(tokenStr)
    responseSuccess({ body: data })
  } catch (error) {
    return responseError({
      code: ERROR_CODE.TOKEN_EXPIRE,
      msg: 'token is expired',
    })
  }
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
