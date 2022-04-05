# service

[cos](https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/sts.js)

# DB 设计

## 最近会话

| 字段名称  | 取值    | 说明                        |
| --------- | ------- | --------------------------- |
| account   | string  | 创建者账号                  |
| type      | string  | 1 群聊 2 单聊               |
| chatId    | 会话 ID | 单聊天为对方账号群聊为群 ID |
| name      | string  | 单聊天为姓名群聊为群名称    |
| lastMsgId | string  | 最后一条消息 ID             |
| isTop     | number  | 1 置顶 0 正常               |

## 消息

| 字段名称  | 取值   | 说明                        |
| --------- | ------ | --------------------------- |
| msgId     | string | 消息 ID                     |
| account   | string | 发送者帐号                  |
| name      | string | 发送者名称                  |
| chatType  | string | 最后一条消息 ID             |
| chatId    | string | 单聊为对方 ID 群聊天为群 ID |
| content   | string | 消息内容                    |
| type      | string | 消息类型                    |
| timestamp | number | 发送时间                    |
