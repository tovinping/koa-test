export interface IBaseGroup {
  _id: number
  groupId: string
  name: string
  /**0正常1已解散 */
  state: '0' | '1'
  avatar: string
  notice: string
  owner: string
}