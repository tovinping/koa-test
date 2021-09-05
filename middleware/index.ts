import * as koaBody from 'koa-body'
import * as cors from 'koa2-cors'
import response from './response'
export function loadMiddleware(app: any) {
  app.use(cors())
  app.use(koaBody())
  app.use(response)
}