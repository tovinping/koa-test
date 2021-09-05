export let mysqlConfig
if (process.env.NODE_ENV === 'development') {
  mysqlConfig = require('C:\\config\\mysql.json')
} else {
  mysqlConfig = require('C:\\config\\mysql.json')
}
