import { ACTION_RESULT } from '../constant/db'
import { checkClientMsg } from '../helper'
import { IMsgModel, Msg } from '../models'
import { getLogger } from '../utils'

const logger = getLogger('db_msg')
export async function addMsg(data: IMsgModel) {
  if (!checkClientMsg(data)) {
    logger.error('check error', data)
    return ACTION_RESULT.ERROR
  }
  try {
    const msg = new Msg(data)
    await msg.save()
    return ACTION_RESULT.OK
  } catch (error) {
    logger.error('save msg err=', error)
    return ACTION_RESULT.ERROR
  }
}
export function removeMsg() {
  return ACTION_RESULT.OK
}
export function updateMsg() {
  return ACTION_RESULT.OK
}
export function getMsg() {
  return ACTION_RESULT.OK
}
