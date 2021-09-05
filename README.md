# service
## config.json:

{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "xxx",
  "password": "xxx",
  "database": "test",
  "synchronize": true,
  "entities": [
    "models/*.ts"
  ]
}

## ERROR:
* ER_NOT_SUPPORTED_AUTH_MODE https://github.com/mysqljs/mysql/issues/1507#issuecomment-385224467