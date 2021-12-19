import mongoose from 'mongoose'
export * from './user'
// import password from '../password.json'
mongoose.connect('mongodb://localhost/test')
// mongoose.connect(password.cloudMongo.url)
