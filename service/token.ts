import { ERROR_CODE } from '../constant'
import { decodeJwtToken, responseError, responseSuccess, verifyJwtToken } from '../utils'
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
    responseSuccess({ data })
  } catch (error) {
    return responseError({
      code: ERROR_CODE.TOKEN_EXPIRE,
      msg: 'token is expired',
    })
  }
}
