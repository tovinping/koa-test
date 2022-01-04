import log4js from 'log4js'

log4js.configure({
  appenders: {
    info: {
      type: 'file',
      filename: 'logs/all-logs.log',
    },
    error: {
      type: 'dateFile',
      filename: 'logs/error.log',
    },
  },
  categories: {
    info: {
      appenders: ['info', 'console'],
      level: 'info',
    },
    error: {
      appenders: ['error', 'console'],
      level: 'error',
    },
  },
})
const loggerInfo = log4js.getLogger('info')
const loggerError = log4js.getLogger('error')
const logger = {
  info(...args: any){
    loggerInfo.info(args)
  },
  error(...args: any) {
    loggerError.error(args)
  }
}
export default logger