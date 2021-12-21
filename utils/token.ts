import jwt from 'jsonwebtoken'
import config from '../config.json'

interface IGetJwtToken {
  account: string
  name: string
}
export function getJwtToken(data: IGetJwtToken) {
  const token = jwt.sign({ account: data.account, name: data.name }, config.jwtSecret, { expiresIn: 30 })
  return token
}

export function verifyJwtToken(tokenStr: string) {
  return jwt.verify(tokenStr, config.jwtSecret)
}

export function decodeJwtToken(tokenStr: string) {
  return jwt.decode(tokenStr, { complete: true })
}
