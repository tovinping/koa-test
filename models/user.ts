import mongoose from 'mongoose'
interface IUserModel {
  account: string
  password: string
  name: string
  mail: string
  salt: string
  sign: string
  avatar: string
  /** 0普通1管理 */
  role: string
}

const schema = new mongoose.Schema<IUserModel>({
  account: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  sign: String,
  avatar: String,
  password: { type: String, select: false },
  salt: {
    type: String,
    select: false,
  },
  role: { type: String, default: '0' },
})
export const User = mongoose.model('user', schema)
