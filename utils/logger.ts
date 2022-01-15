import log4js from 'log4js'
import type { Appender } from 'log4js'
const isDev = process.env.NODE_ENV === 'development'
const common = { maxLogSize: 10485760, numBackups: 5 }
const modules: string[] = ['default', 'user', 'token']
const appenders: Record<string, Appender> = {}
const categories: Record<string, { appenders: string[]; level: string }> = {}
modules.map(module => {
  appenders[module] = {
    type: 'file',
    filename: `log/${module}.log`,
    ...common,
  }
  categories[module] = {
    appenders: isDev ? [module, 'console'] : [module],
    level: 'info',
  }
})

log4js.configure({
  appenders: {
    console: { type: 'console' },
    ...appenders,
  },
  categories: {
    ...categories,
  },
})

export const getLogger = log4js.getLogger
