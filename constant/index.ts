import dotenv from 'dotenv'
export * from './cos'
export * from './errorCode'
export * from './chat'
export * from './msg'

dotenv.config()
export enum YES_NO {
  YES = 1,
  NO = 0,
}
