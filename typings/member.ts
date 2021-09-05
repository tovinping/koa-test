export interface IBaseMemberInfo {
  account: string
  groupId: string
  /**0普通成员1管理员 */
  type: '0' | '1';
  nickName?: string
}