import mongoose from 'mongoose'
export * from './redis'
export * from './user'
export * from './chat'
export * from './msg'
const { DB_HOST = '', DB_PATH = '', DB_ACCOUNT = '', DB_PASSWORD = '', DB_PORT = '' } = process.env
export function mongooseConnect() {
  return mongoose.connect(`mongodb://${DB_ACCOUNT}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_PATH}`)
}
