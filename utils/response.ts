interface IResponse<T = any> {
  code?: number
  body?: T
  msg?: string
}
export function responseSuccess(params?: IResponse) {
  const { code = 0, msg = '成功', body = null } = params || {}
  return {
    code,
    msg,
    body,
  }
}

export function responseError(params?: IResponse) {
  const { code = 1, msg = '失败', body = null } = params || {}
  return {
    code,
    msg,
    body,
  }
}
