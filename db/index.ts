import mongoose from 'mongoose'
export * from './user'
const {DB_HOST = '', DB_PATH = ''} = process.env
mongoose.connect(`mongodb://${DB_HOST}/${DB_PATH}`)
