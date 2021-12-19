export function responseSuccess({
  code = 0,
  msg = "成功",
  data = null,
}) {
  return {
    code,
    msg,
    data,
  };
}

export function responseError({
  code = 1,
  msg = "失败",
  data = null,
}) {
  return {
    code,
    msg,
    data,
  };
}