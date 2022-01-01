interface IResponse<T = any> {
  code?: number
  body?: T
  msg?: string
}
export function responseSuccess({ code = 0, msg = '成功', body = null }: IResponse) {
  return {
    code,
    msg,
    body,
  }
}

export function responseError({ code = 1, msg = '失败', body = null }: IResponse) {
  return {
    code,
    msg,
    body,
  }
}
