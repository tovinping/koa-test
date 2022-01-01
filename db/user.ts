import mongoose from 'mongoose'
interface IUserModel {
  account: string
  password: string
  name: string
  mail: string
  salt: string
  sign: string
  /** 0普通1管理 */
  role: string
}

const schema = new mongoose.Schema<IUserModel>({
  account: String,
  name: String,
  mail: String,
  sign: String,
  password: { type: String, select: false },
  salt: {
    type: String,
    select: false,
  },
  role: { type: String, default: '0' },
})
export const User = mongoose.model('user', schema)
