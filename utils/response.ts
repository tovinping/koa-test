interface IResponse<T = any> {
  code?: number
  data?: T
  msg?: string
}
export function responseSuccess({
  code = 0,
  msg = '成功',
  data = null,
}: IResponse) {
  return {
    code,
    msg,
    data,
  }
}

export function responseError({
  code = 1,
  msg = '失败',
  data = null,
}: IResponse) {
  return {
    code,
    msg,
    data,
  }
}
