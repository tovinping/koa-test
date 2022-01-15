import dotenv from 'dotenv'
export * from './cos'
export * from './errorCode'
export * from './chat'

dotenv.config()
export enum YES_NO {
  YES = 1,
  NO = 0,
}