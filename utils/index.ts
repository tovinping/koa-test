export * from './response'
export * from './encrypt'
export * from './token'
export * from './validator'

export function isEmpty(val?: any) {
  return !(val
    ? typeof val === 'object'
      ? Array.isArray(val)
        ? !!val.length
        : !!Object.keys(val).length
      : true
    : false)
}
