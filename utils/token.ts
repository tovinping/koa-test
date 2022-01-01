import jwt from 'jsonwebtoken'
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
